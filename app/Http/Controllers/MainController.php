<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Gallery;
use App\Models\Post;
use Illuminate\Http\Request;

class MainController extends Controller
{
    //
    public function home()
    {
        $posts = Post::orderBy('id', 'desc')->get();
        $gallery = Gallery::get();
        return view('home', ['posts' => $posts, 'gallery' => $gallery]);
    }

    public function about()
    {
        return view('about');
    }

    public function artificial_silk_plants()
    {
        return view('artificial-silk-plants');
    }

    public function plant_rental()
    {
        return view('plant-rental');
    }

    public function contact()
    {
        return view('contact');
    }

    public function exterior_landscape_design()
    {
        return view('exterior-landscape-design');
    }

    public function interior_landscape_design()
    {
        return view('interior-landscape-design');
    }

    public function plant_services()
    {
        return view('plant-services');
    }

    public function plant_maintenance()
    {
        return view('plant-maintenance');
    }

    public function portfolio()
    {
        return view('portfolio');
    }

    public function service_calls()
    {
        return view('service-calls');
    }

    public function post(Request $req)
    {
        $filteredpost = Post::where('id', $req->id)->get();
        $filteredgallery = Gallery::where('postid', $req->id)->get();
        return view('post', ['filteredpost' => $filteredpost, 'filteredgallery' => $filteredgallery]);
    }

    public function postsapi()
    {
        return Post::orderBy('id', 'desc')->get();
    }

    public function galleriesapi()
    {
        return Gallery::get();
    }

    public function sendmessage(Request $req)
    {
        $req->validate([
            'sendername' => 'required',
            'senderemail' => 'required|email',
            'subject' => 'required',
            'message' => 'required'
        ]);

        $sendername = $req->sendername;
        $senderemail = $req->senderemail;
        $subject = $req->subject;
        $message = $req->message;
        Chat::create([
            'sendername' => $sendername,
            'senderemail' => $senderemail,
            'subject' => $subject,
            'message' => $message
        ]);
    }
}
