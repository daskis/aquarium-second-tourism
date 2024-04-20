<div class="w-full flex flex-col space-y-4 mt-4">
    @foreach($chats as $chat)
        <a href="{{ route('chat.view', $chat->id) }}" class="w-full px-4 py-2 bg-gray-600 text-white font-bold rounded-md">
            {{ $chat->chat_name }}
        </a>
    @endforeach
</div>
