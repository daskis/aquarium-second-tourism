<x-app-layout>
    <div class="flex flex-col sm:flex-row w-screen h-screen bg-black">
        <div class="w-full sm:w-1/4 bg-gray-800 p-2">
            <a href="{{ route('dashboard') }}" class="block w-full px-4 py-2 bg-gray-600 text-white font-bold rounded-md mt-2">На главную</a>
            <div class="h-[95%] overflow-y-auto">
                <livewire:chat-list />
            </div>
            <livewire:create-new-chat />
        </div>
        <div class="w-full sm:w-3/4">
            <livewire:view-messages :chat_id="$id" />
        </div>
    </div>
    <script src="https://cdn.tailwindcss.com"></script>
</x-app-layout>
