$(document).ready(function(){

    var path = window.location.pathname;
    var page = path.split("/").pop();
  
    let metaData = `
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title >LavnaLocks | Buy Digital Fingerprint Lock Online</title>`;
    

    if(page=='/'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title >LavnaLocks | Buy Digital Fingerprint Lock Online</title>`;
        $('head').prepend(metaData);
    }

    if(page=='about'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title >About Us | Digital Fingerprint Lock- LavnaLocks</title>`;
        $('head').prepend(metaData);
    }

    if(page == 'shop'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>Explore wide range of smart door locks | LavnaLocks</title>`
        $('head').prepend(metaData);
    }

    if(page == 'builder'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>Real State Project | Lavna Digital Lock- LavnaLocks</title>`
        $('head').prepend(metaData);
    }

    if(page == 'signin'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>Signin | Digital Fingerprint Lock - LavnaLocks</title>`
        $('head').prepend(metaData);
    }

    if(page == 'signup'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>SignUp | Lavna Digital Lock- Smart Door Lock </title>`
        $('head').prepend(metaData);
    }

    if(page == 'shopping-cart'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>Shoppinp Cart | Smart Door Lock - LavnaLocks </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-A24-Black(Bluetooth)'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>L-A24 | The 6 in 1 smart door lock - LavnaLocks </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-A28-Black(Bluetooth)'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>L-A28 | Fingerprint door Lock - Lavna Digital Locks </title>`
        $('head').prepend(metaData);
    }
  
    if(page == 'L-A15'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>L-A15 | Digital Fingerprint Lock | Lavna Digital Locks </title>`
        $('head').prepend(metaData);
    }
    if(page == 'L-S9'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title> L-S9 | Digital Door Lock | Digital Fingerprint Locks </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-A24-GOLD'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title> L-A24-Gold | Fingerprint Door Lock | Lavna Digital Lock </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-H300(Encoder)'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title> L-H300 (Encoder) | Digital Door Lock | Lavna Digital Lock </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-A5'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title> L-A5 | Fingerprint Door Lock | Lavna Digital Lock </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-A28-GOLD'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title> L-A28-GOLD | Digital Door Lock | Lavna Digital Lock </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-E50'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title> L-E50 | Lavna Digital Locks - LavnaLocks </title>`
        $('head').prepend(metaData);
    }
  
 });
  