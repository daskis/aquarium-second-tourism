<x-app-layout>
    <div class="flex w-screen h-screen bg-black">
        <div class="w-1/4 bg-gray-800 p-2">
            <a href="{{ route('dashboard') }}" class="w-full px-4 py-2 bg-gray-600 text-white font-bold rounded-md mt-2">На главную</a>
            <div class="h-[95%] overflow-y-auto">
                <livewire:chat-list />
            </div>
            <livewire:create-new-chat />
        </div>
        <div class="w-full flex items-center justify-center h-full">
            <h4 class="font-bold text-white">Выберите чат</h4>
        </div>
    </div>
</x-app-layout>
