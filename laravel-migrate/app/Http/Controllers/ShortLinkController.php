<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShortLink;
use Illuminate\Support\Str;

class ShortLinkController extends Controller
{
    public function index()
    {
        $shortlinks = ShortLink::latest()->get();
        $ip=request()->ip();
        return response()->json([
            'status'=> 200,
            'shortlinks'=>$shortlinks,
            'ip'=>$ip,
        ]);


   
        // return view('shortenLink', compact('shortLinks'));
    }
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
           'link' => 'required|url'
        ]);
   
        $input['link'] = $request->link;
        $input['code'] = 'http://localhost:8000/'.Str::random(6);
   
        ShortLink::create($input);
  
        return response()->json([
            'status'=> 200,
            'message'=>'Successfully Generate URL...',
        ]);
    }
    public function shortenLink($code)
    {
        $find = ShortLink::where('code', $code)->first();

        return response()->json([
            'status'=> 200,
            'message'=>'URL LIST',
        ]);
   
        // return redirect($find->link);
    }
}
