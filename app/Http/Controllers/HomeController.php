<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Gallery;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use function PHPUnit\Framework\fileExists;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function panel()
    {
        return view('panel');
    }

    public function makepost(Request $req)
    {
        $req->validate([
            'gallery' => 'required',
            'header' => 'required',
            'post' => 'required'
        ]);

        Post::create([
            'header' => $req->header,
            'post' => $req->post
        ]);

        $lastPostId = Post::latest()->value("id");

        if ($req->hasFile('gallery')) {
            foreach ($req->file('gallery') as $file) {
                $originalFileName = $file->getClientOriginalName();
                $filename = 'top_gardening' . Carbon::now()->format('YmdHis') . rand(0, 9999999999) . $originalFileName;
                $file->move(public_path('gallery'), $filename);

                Gallery::create([
                    'postid' => $lastPostId,
                    'name' => $filename
                ]);
            }
        } else {
            return "Files did not request.";
        }
    }

    public function deletepost(Request $req)
    {
        Post::where('id', $req->id)->delete();
        $filesNames = Gallery::where('postid', $req->id)->pluck('name')->toArray();
        foreach ($filesNames as $fileName) {
            if (file_exists(public_path("gallery/$fileName"))) {
                unlink(public_path("gallery/$fileName"));
            } else {
                echo "The file does not exist: public/gallery/$fileName";
            }
        }
        Gallery::where('postid', $req->id)->delete();
    }

    public function chat()
    {
        return view('chat');
    }

    public function chatapi()
    {
        return Chat::orderBy('id', 'desc')->get();
    }

    public function deletemessage(Request $req)
    {
        $req->validate([
            'id' => 'required'
        ]);

        Chat::where('id', $req->id)->delete();
    }
}
