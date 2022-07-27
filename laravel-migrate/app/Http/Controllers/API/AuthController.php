<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|max:20|min:8',
        ]);
 
        if ($validator->fails()) {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }else{
            $user = User::create([
                'name' =>  $request->name,
                'email'=> $request->email,
                'password'=> Hash::make($request->password),
                'verification_code'=> sha1(time()),

            ]);

            $token = $user->createToken($user->email.'_token', ['server:update'])->plainTextToken;

            if($token != null){

                $email = $request->email;

            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);

            $user = User::where('email', $request->email)->first();

            if($user != null){
                $user->is_verified = 1;
                $user->role_as = 1;
                $user->save();
            }

            if($user->role_as == 1)
                {
                    $role= 'admin';
                    $token = $user->createToken($user->email.'_Admintoken', ['server:admin'])->plainTextToken;

                }
                else{
                    $role= '';
                    $token = $user->createToken($user->email.'_token', [''])->plainTextToken;
                }
            return response()->json([
                'status'=> 200,
                'username'=>$user->name,
                'token'=>$token,
                'verification_code'=>$user->verification_code,
                'message'=>'Successfully Registered',
                'role' => $role,
            ]);
            }
        }

    }

    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email'=>'required|max:191',
            'password'=>'required',
        ]);

        // dd($validator);

        if($validator->fails())
        {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->messages(),
            ]);
        }
        else{

            $user = User::where('email', $request->email)->first();

            // dd($user);
 
            if (! $user || ! Hash::check($request->password, $user->password) || $user->role_as != 1) {
                return response()->json([
                    'status'=> 401,
                    'message'=> 'Invalid Credentials',
                ]);
            }
            else{
                if($user->role_as == 1)
                {
                    $role= 'admin';
                    $token = $user->createToken($user->email.'_Admintoken', ['server:admin'])->plainTextToken;

                }
                else{
                    $role= '';
                    $token = $user->createToken($user->email.'_token', [''])->plainTextToken;
                }
                
                return response()->json([
                    'status'=> 200,
                    'username'=>$user->name,
                    'token'=>$token,
                    'message'=>'Successfully Logged In',
                    'role' => $role,
                ]);
            }

        }

    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message'=> 'logged out Successfully',
        ]);
    }
    
}
