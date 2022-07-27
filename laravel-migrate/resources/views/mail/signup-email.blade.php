Hello {{$email_data['name']}}
<br><br>
Welcome to Our Web App!
<br>
Please click the below link to verify your email and activate your account!
<br><br>
<!-- <a href="http://localhost:3000/reset/{{$email_data['verification_code']}}">Click Here!</a> -->
<a href="http://localhost:3000/reset/?code={{$email_data['verification_code']}}">Click Here!</a>
<!-- <a href="http://localhost:8000/api/verify?code={{$email_data['verification_code']}}">Click Here!</a> -->

<br><br>
Thank you!
<br>
 <a href="https://www.colorexpertsbd.com/">Colors Experts International</a>