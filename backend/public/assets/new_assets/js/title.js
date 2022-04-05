$(document).ready(function(){

    var path = window.location.pathname;
    var page = path.split("/").pop();
  
    let metaData = `
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title >Buy Digital Fingerprint Door Lock Online  - Lavna Locks</title>`;
    

    if(page=='/'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title >Buy Digital Fingerprint Door Lock Online  - Lavna Locks</title>`;
        $('head').prepend(metaData);
    }

    if(page=='about'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title >About Us - Lavna Locks</title>`;
        $('head').prepend(metaData);
    }

    if(page == 'shop'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>Online Shop - Lavna Locks</title>`
        $('head').prepend(metaData);
    }

    if(page == 'builder'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>Real State Project - Lavna Locks</title>`
        $('head').prepend(metaData);
    }

    if(page == 'signin'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>Accounts Sign in - Lavna Locks</title>`
        $('head').prepend(metaData);
    }

    if(page == 'signup'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>Sign Up - Lavna Locks </title>`
        $('head').prepend(metaData);
    }

    if(page == 'shopping-cart'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>Shoppinp Cart - Lavna Locks </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-A24-Black(Bluetooth)'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>L-A24-Black(Bluetooth) Door Lock - Lavna Locks </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-A28-Black(Bluetooth)'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>L-A28-Black(Bluetooth) Door Lock - Lavna Locks </title>`
        $('head').prepend(metaData);
    }
  
    if(page == 'L-A15'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>Buy L-A15 Smart Fingerprint Digital Door Lock - Lavna Locks </title>`
        $('head').prepend(metaData);
    }
    if(page == 'L-S9'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title> Buy L-S9 Fingerprint Door Lock online - Lavna Locks </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-A24-GOLD'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title> L-A24-GOLD Biometric Fingerprint Door Lock - Lavna Locks   </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-H300(Encoder)'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title> L-H300(Encoder) Door Lock - Lavna Locks </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-A5'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title> Buy L-A5 Digital Door Lock for Glass Door - Lavna Locks </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-A28-GOLD'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title> L-A28-GOLD Biometric Door Lock System for Office - Lavna Locks </title>`
        $('head').prepend(metaData);
    }

    if(page == 'L-E50'){
        metaData = `
        <meta charset="utf-8">
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <title>L-E50 Best Smart Locks for Home - Lavna Locks </title>`
        $('head').prepend(metaData);
    }
  
 });
  