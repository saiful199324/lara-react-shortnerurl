<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResetRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Mail\SignupEmail;
use App\Mail\ForgotEmail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Mail\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MailController extends Controller
{
    public static function sendSignupEmail($name, $email, $verification_code){
        $data = [
            'name' => $name,
            'verification_code' => $verification_code
        ];
        Mail::to($email)->send(new SignupEmail($data));
    }

    public function forgot(Request $request)
    {
        // dd($request->all());

        $email = $request->input('email');
        $token = Str::random(12);

         DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token
        ]);

        $data = [
            'email' => $email,
            'token' => $token
        ];

        // dd($data);

        Mail::to($email)->send(new ForgotEmail($data));

        return response()->json([
            'status'=> 200,
            'message'=>'Successfully Sent Email',
        ]);

    }

    public function reset(ResetRequest $request)
    {

        // dd($request->all());
        // dd("Hello");

        $passwordReset = DB::table('password_resets')
            ->where('token', $request->input('token'))->first();

        if (!$user = User::where('email', $passwordReset->email)->first()) {
            throw new NotFoundHttpException('User not found!');
        }

        $user->password = Hash::make($request->input('password'));
        $user->is_verified = 1;
            $user->role_as = 1;
        $user->save();

        return response([
            'status'=> 200,
            'message' => 'Successfully Changed your Password'
        ]);
    }


    





}
