$url = 'http://3.120.127.207/api/login/';
$data = array('username' => 'Beeldengeluid', 'password' => 'Jkf738%^dg');

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => {"Content-Type": "application/json",
                                  "Access-Control-Allow-Origin": "*",
                                  "cache-control": "no-cache",
                                  "Accept": "application/json",
                                  "Authorization": "Basic Og==",
                                  "postman-token": "44a260fc-db86-3ffc-ab77-e8229fa5e1b0"},
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) { /* Handle error */ }



return $result;