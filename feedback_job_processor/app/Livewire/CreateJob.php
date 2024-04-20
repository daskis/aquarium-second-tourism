<?php

namespace App\Livewire;

use App\Models\FeedbackJobs;
use Livewire\Component;

class CreateJob extends Component
{
    public $rate;
    public $text;
    public function render()
    {
        return view('livewire.create-job');
    }

    public function setRate(int $rate)
    {
        $this->rate = $rate;
        $this->render();
    }

    public function create() {
        FeedbackJobs::create([
            'rate' => $this->rate,
            'text' => $this->text,
            'user_id' => 1,
            'place_id' => 1,
        ]);

        $this->rate = $this->text = null;
    }
}
