$(document).ready(function(){

    var path = window.location.pathname;
    var page = path.split("/").pop();
  
    let metaData = `
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title >Buy Digital Fingerprint Door Lock Online  - Lavna Locks</title>`;
    
    if(page == 'signin'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>Accounts Sign in - Lavna Locks</title>
        <meta name="description" content=" " />`
        $('head').prepend(metaData);
    }

    if(page == 'signup'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>Sign Up - Lavna Locks </title>
        <meta name="description" content=" " />`
        $('head').prepend(metaData);
    }

  
 });
  