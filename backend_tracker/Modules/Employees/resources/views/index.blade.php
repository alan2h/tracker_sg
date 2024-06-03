@extends('employees::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('employees.name') !!}</p>
@endsection
