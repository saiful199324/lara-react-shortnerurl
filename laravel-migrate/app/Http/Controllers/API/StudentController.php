<?php

namespace App\Http\Controllers\API;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\MailController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Mail\ForgotEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class StudentController extends Controller
{
    public function index()
    {

        // $students = Student::paginate(10);
        // return $students;


        // $students = DB::table('students')->paginate(5);


        // $students = Student::where('is_emailed', '1')->paginate(5);
        // $students = Student::query()->orderByDesc('id')->paginate(5);
        // $students = Student::all()->paginate(5);
        $students = Student::all();

        // dd($students);

        // dd($students);

        return response()->json([
            'status'=> 200,
            'students'=>$students,
        ]);
        // return response($students,200);
    }
    public function store(Request $request)
    {
        // dd($request->all());

        $validator = Validator::make($request->all(), [
            'name'=>'required|max:191',
          'course'=>'required|max:191',
          'email'=>'required|email|max:191',
          'phone'=>'required|max:20|min:10',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'=> 422,
                'validate_err'=> $validator->errors(),
            ]);
        }else{
            $student = new Student;
            $student->name = $request->input('name');
            $student->course = $request->input('course');
            $student->email = $request->input('email');
            $student->phone = $request->input('phone');
            $student->is_emailed = $request->input('email_verified');
            $student->save();


            $customer = Student::where('email', $request->input('email'))->where('is_emailed', 1)->first();

            // dd($customer); 

            if($customer){
                $user = User::create([
                    'name' =>  $student->name,
                    'email'=> $student->email,
                    'password'=> Hash::make(str_random(8)),
                    'verification_code'=> sha1(time()),
                ]);

                // dd($user);
    
                // dd($user);
    
                $token = $user->createToken($user->email.'_token', ['server:update'])->plainTextToken;
    
                if($token != null){

                    $email = $request->email;

                    DB::table('password_resets')->insert([
                       'email' => $email,
                       'token' => $token
                   ]);
           
                   $data = [
                       'email' => $email,
                       'token' => $token
                   ];
           
           
           
                           Mail::to($email)->send(new ForgotEmail($data));
           
                           return response()->json([
                               'status'=> 200,
                               'message'=>'Successfully Registered',
                           ]);



                    // MailController::sendSignupEmail($user->name, $user->email, $user->verification_code);
                    // return response()->json([
                    //     'status'=> 200,
                    //     'username'=>$user->name,
                    //     'token'=>$token,
                    //     'verification_code'=>$user->verification_code,
                    //     'message'=>'Successfully Add Customer',
                    // ]);
                }

            }

            // dd($student);




            return response()->json([
                'status'=> 200,
                'message'=>'Student Added Successfully',
            ]);

            // dd($student);


        }





    }
    public function edit($id)
    {
        $student = Student::find($id);
        // dd($student);
        if($student)
        {
            return response()->json([
                'status'=> 200,
                'student' => $student,
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Student ID Found',
            ]);
        }
    }


    public function update(Request $request, $id)
    {
        $student = Student::find($id);
        if($student)
        {

            $student->name = $request->input('name');
            $student->course = $request->input('course');
            $student->email = $request->input('email');
            $student->phone = $request->input('phone');
            $student->update();

            return response()->json([
                'status'=> 200,
                'message'=>'Student Updated Successfully',
            ]);
        }
    }

    public function destroy($id)
    {
        $student = Student::find($id);
        if($student)
        {
            $student->delete();
            return response()->json([
                'status'=> 200,
                'message'=>'Student Deleted Successfully',
            ]);
        }
        else
        {
            return response()->json([
                'status'=> 404,
                'message' => 'No Student ID Found',
            ]);
        }
    }




}
