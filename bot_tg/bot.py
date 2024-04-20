import logging
import sqlite3
import asyncio
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton, ReplyKeyboardRemove
from telegram.ext import CallbackContext, Application, CommandHandler, ContextTypes, ConversationHandler, MessageHandler, filters, CallbackQueryHandler
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import nest_asyncio
import sys
import os
nest_asyncio.apply()
print(sys.version)
logger = logging.getLogger(__name__)
# States
(START_CHOICE, QUESTION_1, QUESTION_2, QUESTION_3, QUESTION_4, QUESTION_5, HELP, RESULT, MENU) = range(9)

# Questions and answers
questions = ['Что взять в путешествие?', 'Твой идеальный день?', 'Твой выбор отдыха?', 'Любимое время года?', 'Твой способ передвижения?']
answers = [
    [['Компас и карта 🧭', 'Исследователь'], ['Путеводитель и очки 📚', 'Мудрец'], ['Кошелек и сувениры 💰', 'Торговец']],
    [['Поход на неизведанное 🚶‍♂️', 'Исследователь'], ['Экскурсия по музеям 🏛', 'Мудрец'], ['Шоппинг и рынки 🛍️', 'Торговец']],
    [['Кемпинг в лесу 🏕️', 'Миролюбец'], ['Альпинизм и дайвинг 🧗‍♂️', 'Приключенец'], ['Пляж и медитация 🏖️', 'Миролюбец']],
    [['Лето, пляжи и солнце ☀️', 'Миролюбец'], ['Зима, горы и сноуборд 🏂', 'Приключенец'], ['Весна, парки и цветы 🌸', 'Исследователь']],
    [['Пешком или велосипед 🚴', 'Исследователь'], ['Поезда и автобусы 🚌', 'Мудрец'], ['Арендованная машина 🚗', 'Торговец']]
]

def save_user_data(user_id, username, character_class, image_path):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute("PRAGMA journal_mode=WAL")
    cursor.execute('''
        INSERT INTO users(user_id, username, class, image_path, speed, cunning, luck)
        VALUES(?,?,?,?,?,?,?)''', (user_id, username, character_class, image_path, 1, 1, 1))
    conn.commit()
    conn.close()
async def send_menu_with_buttons(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """
    Sends a personalized menu with buttons based on user data from the database.
    
    Parameters:
    update (Update): The update object from the Telegram API.
    context (ContextTypes.DEFAULT_TYPE): The context object from the Telethon API.
    """
    print(update, context)
    user_id = update.effective_user.id
    try:
        with sqlite3.connect('users.db') as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT username, class, image_path, speed, cunning, luck FROM users WHERE user_id = ?', (user_id,))
            user_data = cursor.fetchone()

        if user_data:
            username, character_class, image_path, speed, cunning, luck = user_data
            personal_message = (
                f"Имя: {username}\n"
                f"Класс: {character_class}\n"
                f"Скорость (скидка на Питстопах): {speed}%\n"
                f"Хитрость (скидка в Магазинах): {cunning}%\n"
                f"Удача (скидка в Отелях): {luck}%"
            )
            keyboard = [
                [InlineKeyboardButton("Квесты", callback_data='quests'),
                 InlineKeyboardButton("Спецпредложения", callback_data='offers')],
                [InlineKeyboardButton("Меню", callback_data='menu')]
            ]
            reply_markup = InlineKeyboardMarkup(keyboard)
            await context.bot.send_message(chat_id=user_id, text=personal_message, reply_markup=reply_markup)
            if image_path and os.path.exists(image_path):
                with open(image_path, 'rb') as photo:
                    await context.bot.send_photo(chat_id=user_id, photo=photo)
        else:
            await context.bot.send_message(chat_id=user_id, text="Профиль пользователя не найден. Выполните регистрацию, используя команду /start.")
    except sqlite3.Error as e:
        await context.bot.send_message(chat_id=user_id, text="Произошла ошибка при доступе к базе данных. Пожалуйста, попробуйте позже.")
        print(f"Database error: {e}")
async def send_notifications(bot):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('SELECT user_id, class FROM users')
    users = cursor.fetchall()
    conn.close()

    for user_id, user_class in users:
        message = f"Специальное предложение для вашего класса: {user_class}: Получите 6% скидку на заправки!"
        try:
            await bot.send_message(chat_id=user_id, text=message)
        except Exception as e:
            logger.error(f"Ошибка при отправке сообщения пользователю {user_id}: {e}")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user_id = update.message.from_user.id
    if not is_user_registered(user_id):
        buttons = [
            [InlineKeyboardButton(text='🧭 Начать выбор класса', callback_data='start_choice')],
            [InlineKeyboardButton(text='🆘 Попросить помощь', callback_data='request_help')]
        ]
        reply_markup = InlineKeyboardMarkup(buttons)
        await update.message.reply_text(
            'Здрав будь, дружище! Меня зовут Александр, богатырь из далеких странствий...',
            reply_markup=reply_markup,
        )
        return START_CHOICE
    else:
        await send_menu_with_buttons(update, context)
        return ConversationHandler.END

async def menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    return await send_menu_with_buttons(update, context)
def is_user_registered(user_id):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    cursor.execute('SELECT 1 FROM users WHERE user_id = ?', (user_id,))
    user_exists = cursor.fetchone() is not None
    conn.close()
    return user_exists

async def start_choice(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    if update.callback_query:
        buttons = [
            [InlineKeyboardButton(text='🧭 Начать выбор класса', callback_data='start_quiz')],
            [InlineKeyboardButton(text='🆘 Попросить помощь', callback_data='request_help')]
        ]
        reply_markup = InlineKeyboardMarkup(buttons)
        # Edit the original message instead of trying to reply to it
        await update.callback_query.message.edit_text(
            'Здрав будь, дружище! Меня зовут Александр, богатырь из далеких странствий...',
            reply_markup=reply_markup
        )
        return START_CHOICE
    else:
        # Regular message handling, if needed
        user_input = update.message.text if update.message else 'No message text available'
        await context.bot.send_message(chat_id=update.effective_chat.id, text=user_input)
        return ConversationHandler.END


async def help(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user_id = update.effective_user.id
    user_question = update.message.text
    # Simulating a response as this would typically call an external function
    chat_response = "Here's some help for you."
    if chat_response.strip():
        await update.message.reply_text(chat_response)
    else:
        await update.message.reply_text("Sorry, I couldn't generate a response.")
    return ConversationHandler.END

async def question_handler(update: Update, context: ContextTypes.DEFAULT_TYPE, question_number: int) -> int:
    buttons = [[InlineKeyboardButton(option[0], callback_data=f"answer_{question_number}_{i}") for i, option in enumerate(answers[question_number])]]
    reply_markup = InlineKeyboardMarkup(buttons)
    question_text = questions[question_number] if question_number < len(questions) else "No more questions."

    if update.callback_query:
        # Edit the message that contained the callback button instead of trying to reply to it
        await update.callback_query.message.edit_text(question_text, reply_markup=reply_markup)
    else:
        # Send a new message if this is not a callback query (for regular flow)
        await context.bot.send_message(chat_id=update.effective_chat.id, text=question_text, reply_markup=reply_markup)
    return question_number + 1


async def result(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    # Get the final class based on scoring or other logic
    final_class = max(context.user_data['results'], key=context.user_data['results'].get)

    # Prepare the text to send to the user
    response_text = f"Твой титул: {final_class}. Используй команду /menu, чтобы увидеть меню."

    # Check if this is a callback query
    if update.callback_query:
        # Use the message from the callback query to send the response
        await update.callback_query.message.edit_text(response_text)
    else:
        # This would be for any non-callback query scenario
        await update.message.reply_text(response_text)

    # Log the user's data (this should ideally happen before sending the message to ensure it's done)
    user_id = update.effective_user.id
    username = update.effective_user.username or "unknown"
    save_user_data(user_id, username, final_class, "peacelover.jpg")

    return ConversationHandler.END

async def handle_message(update: Update, context: CallbackContext):
    text = update.message.text
    await update.message.reply_text(f"You wrote: {text}")
    return ConversationHandler.END

async def callback_query_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()  # Always acknowledge the callback query first to prevent the client from hanging
    
    data = query.data  # Extract data from the callback
    print(data)
    # Handle starting the quiz
    if data == 'start_choice':
        return await question_handler(update, context, 0)

    # Handle answers to quiz questions
    elif data.startswith('answer_'):
        parts = data.split('_')
        question_number = int(parts[1])
        answer_index = int(parts[2])
        if 'results' not in context.user_data:
            context.user_data['results'] = {}
        selected_option = answers[question_number][answer_index]
        result_key = selected_option[1]  # Extract character type from the answer
        context.user_data['results'][result_key] = context.user_data['results'].get(result_key, 0) + 1
        
        # Check if more questions are available and direct accordingly
        if question_number + 1 < len(questions):
            return await question_handler(update, context, question_number + 1)
        else:
            # If no more questions, proceed to showing results
            return await result(update, context)

    # Handle request for help
    elif data == 'request_help':
        return await help(update, context)

    # Add additional conditions for other functionalities as needed
    elif data == 'menu':
        return await send_menu_with_buttons(update, context)
    elif data.startswith('quests'):
        return await send_special_quest(update, context, data.split(':')[1] if len(data.split(':')) > 1 else None)
    elif data == 'offers':
        return await send_special_offers(update, context)
    else:
        # If the callback data is not recognized, send an error message
        if update.callback_query.message:
            print(data)
            await update.callback_query.message.reply_text("Sorry, I didn't understand that command.")
        else:
            await context.bot.send_message(chat_id=update.effective_chat.id, text="Sorry, I didn't understand that command.")
        return ConversationHandler.END

async def send_special_quest(update: Update, context: CallbackContext, quest_id=None):
    try:
        with sqlite3.connect('users.db') as conn:
            cursor = conn.cursor()
            if quest_id is None:
                cursor.execute('SELECT * FROM quests ORDER BY RANDOM() LIMIT 1')
            else:
                cursor.execute('SELECT * FROM quests WHERE quest_id = ?', (quest_id,))
            
            quest = cursor.fetchone()

        if quest is None:
            await context.bot.send_message(chat_id=update.effective_chat.id, text="Квест не найден.")
            return

        # Correctly unpack the quest details
        quest_id, title, description, image_url = quest

        # Fetch navigation quests
        with conn:  # Reuse the connection and cursor for subsequent queries
            next_quest_id = conn.execute(''' 
        SELECT quest_id FROM quests WHERE quest_id > ? ORDER BY quest_id ASC LIMIT 1
    ''', (quest_id,)).fetchone()
            if not next_quest_id:
                next_quest_id = conn.execute('''
            SELECT quest_id FROM quests ORDER BY quest_id ASC LIMIT 1
        ''').fetchone()

    # Fetch the previous quest ID; if none, fetch the largest ID
            prev_quest_id = conn.execute('''
        SELECT quest_id FROM quests WHERE quest_id < ? ORDER BY quest_id DESC LIMIT 1
    ''', (quest_id,)).fetchone()
            if not prev_quest_id:
                prev_quest_id = conn.execute('''
            SELECT quest_id FROM quests ORDER BY quest_id DESC LIMIT 1
        ''').fetchone()
        print(next_quest_id[0], prev_quest_id[0])
        # Prepare buttons with conditional rendering
        buttons = [
            [InlineKeyboardButton("Следующий квест", callback_data=f'quests:{next_quest_id[0] if next_quest_id else "end"}'),
             InlineKeyboardButton("Предыдущий квест", callback_data=f'quests:{prev_quest_id[0] if prev_quest_id else "start"}')],
            [InlineKeyboardButton("Меню", callback_data='menu')]
        ]
        reply_markup = InlineKeyboardMarkup(buttons)

        if image_url:
            await context.bot.send_photo(chat_id=update.effective_chat.id, photo=image_url, caption=f"*{title}*\n{description}", reply_markup=reply_markup, parse_mode="Markdown")
        else:
            await context.bot.send_message(chat_id=update.effective_chat.id, text=f"*{title}*\n{description}", reply_markup=reply_markup, parse_mode="Markdown")

    except sqlite3.Error as e:
        await context.bot.send_message(chat_id=update.effective_chat.id, text="Произошла ошибка при доступе к базе данных.")
        print(f"Database error: {e}")
    except Exception as e:
        await context.bot.send_message(chat_id=update.effective_chat.id, text="Произошла неожиданная ошибка.")
        print(f"Unexpected error: {e}")

async def send_special_offers(update: Update, context: ContextTypes.DEFAULT_TYPE, offer_id=None):
    with sqlite3.connect('users.db') as conn:
        cursor = conn.cursor()
        try:
            if offer_id is None:
                cursor.execute('SELECT * FROM offers ORDER BY RANDOM() LIMIT 1')
            else:
                cursor.execute('SELECT * FROM offers WHERE offer_id = ?', (offer_id,))
            offer = cursor.fetchone()

            if offer is None:
                await context.bot.send_message(chat_id=update.effective_chat.id, text="Спецпредложение не найдено.")
                return

            offer_id, title, description, discount, image_path = offer
            # Fetch navigation offers
            prev_offer_id = cursor.execute('SELECT offer_id FROM offers WHERE offer_id < ? ORDER BY offer_id DESC LIMIT 1', (offer_id,)).fetchone()
            next_offer_id = cursor.execute('SELECT offer_id FROM offers WHERE offer_id > ? ORDER BY offer_id ASC LIMIT 1', (offer_id,)).fetchone()

            # Prepare buttons with conditional rendering
            buttons = [
                [InlineKeyboardButton("Следующее предложение", callback_data=f'offers:{next_offer_id[0]}' if next_offer_id else 'offers:end'),
                 InlineKeyboardButton("Предыдущее предложение", callback_data=f'offers:{prev_offer_id[0]}' if prev_offer_id else 'offers:start')],
                [InlineKeyboardButton("Меню", callback_data='menu')]
            ]
            reply_markup = InlineKeyboardMarkup(buttons)
            if image_path.startswith("http"):
                await context.bot.send_photo(chat_id=update.effective_chat.id, photo=image_path, caption=f"*{title}*\n{description}", reply_markup=reply_markup, parse_mode="Markdown")
            else:
                await context.bot.send_message(chat_id=update.effective_chat.id, text=f"*{title}*\n{description}", reply_markup=reply_markup, parse_mode="Markdown")
        except sqlite3.Error as e:
            await context.bot.send_message(chat_id=update.effective_chat.id, text="An error occurred while accessing the database.")
            logging.error(f"Database error: {e}")

def main():
    application = Application.builder().token("7174365563:AAEu4QAEYmMRxfqw0Hmqj5DejOee0hEV8TI").build()
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],
        states={
            START_CHOICE: [CallbackQueryHandler(callback_query_handler)],
            QUESTION_1: [CallbackQueryHandler(callback_query_handler)],
            QUESTION_2: [CallbackQueryHandler(callback_query_handler)],
            QUESTION_3: [CallbackQueryHandler(callback_query_handler)],
            QUESTION_4: [CallbackQueryHandler(callback_query_handler)],
            QUESTION_5: [CallbackQueryHandler(callback_query_handler)],
            HELP: [CallbackQueryHandler(callback_query_handler)],
            RESULT: [CallbackQueryHandler(callback_query_handler)],
            MENU: [CallbackQueryHandler(callback_query_handler)]
        },
        fallbacks=[CommandHandler('cancel', start)]
    )
    
    application.add_handler(conv_handler)
    application.add_handler(CallbackQueryHandler(callback_query_handler))
    # application.add_job(send_notifications, 'interval', seconds=130, args=[application.bot])
    # application.start()
    
    # loop = asyncio.get_event_loop()
    # loop.create_task(application.run_polling())
    # loop.run_forever()
    application.run_polling()

if __name__ == '__main__':
    main()
