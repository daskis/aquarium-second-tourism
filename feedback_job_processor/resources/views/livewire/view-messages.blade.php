<div class="h-screen" wire:poll.750ms>
    <div class="h-[90%] overflow-y-auto text-white">
        @if($messages)
            @foreach($messages as $message)
                <div class="w-full py-8 @if($message->actor == "user") bg-gray-700 @elseif($message->actor == "ai") bg-white @endif">
                    <div class="w-2/3 mx-auto flex items-start space-x-4">
                        <div class="flex w-1/5 items-center justify-center h-auto w-1/5 rounded-md mr-8 bg-black">
                            <h4 class="text-2xl font-bold text-white">{{ $message->actor }}</h4>
                        </div>

                        <div class="w-4/5">
                            @if(($message->is_send_to_processing && $message->is_done) || $message->actor == "ai")

                                <div class="text-black">
                                    @if($message->actor == "user")
                                        @if("message_loyality" == $message->text)
                                            <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 dark:bg-neutral-800 dark:border-neutral-700" role="alert">
                                                <div class="flex">
                                                    <div class="flex-shrink-0">
                                                        <svg class="flex-shrink-0 size-4 text-blue-600 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <circle cx="12" cy="12" r="10"></circle>
                                                            <path d="M12 16v-4"></path>
                                                            <path d="M12 8h.01"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="ms-3">
                                                        <h3 class="text-gray-800 font-semibold">
                                                            Создать идею программы лояльности
                                                        </h3>
                                                        <p class="mt-2 text-sm text-gray-700">
                                                            Это может занять немного времени, наш AI изучает текущие данные для составления наилучшей системы лояльности.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        @elseif("message_loyality_research" == $message->text)
                                            <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 dark:bg-neutral-800 dark:border-neutral-700" role="alert">
                                                <div class="flex">
                                                    <div class="flex-shrink-0">
                                                        <svg class="flex-shrink-0 size-4 text-blue-600 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <circle cx="12" cy="12" r="10"></circle>
                                                            <path d="M12 16v-4"></path>
                                                            <path d="M12 8h.01"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="ms-3">
                                                        <h3 class="text-gray-800 font-semibold">
                                                            Создать иследование для программы лояльности
                                                        </h3>
                                                        <p class="mt-2 text-sm text-gray-700">
                                                            Это может занять немного времени, наш AI изучает текущие данные для составления наилучшей системы лояльности.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        @else
                                            {{ $message->text }}
                                        @endif
                                    @else
                                        {!! $message->text !!}
                                    @endif
                                </div>

                            @elseif(!$message->is_send_to_processing || !$message->is_done)

                                <img src="{{ asset('squers.gif') }}" class="w-56 mx-auto rounded-full" alt="">

                            @endif

                            <livewire:view-message-jobs :message_id="$message->id" />
                        </div>

                    </div>
                </div>
            @endforeach
        @endif
    </div>
    @if($chat_id)
        <div class="mx-auto w-1/3">
            <div class="w-full flex space-x-2">
                <button wire:click="newProgramLoyality" type="button" class="bg-white rounded-md px-4 py-2 ring-1 text-gray-700">Придумай программу лояльности</button>
                <button wire:click="newProgramLoyalityReseearch" type="button" class="bg-white rounded-md px-4 py-2 ring-1 text-gray-700">Проведи иследование по ПЛ</button>
            </div>

            <form wire:submit.prevent="create" class="flex space-x-2 items-center mt-4">
                <div class="w-full">
                    <div class="relative">
                        <input wire:model="text" required type="text" class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Сообщение"/>
                        @error('text') <span class="text-red-500">{{ $message }}</span> @enderror
                    </div>
                </div>

                <button type="submit" class="flex items-center justify-center bg-white text-black rounded-md h-12 w-24">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </form>
        </div>
    @endif
</div>
