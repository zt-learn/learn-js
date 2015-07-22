$(document).ready(function () {

    /*页面加载后，获取所有商品信息，使用模板引擎将信息渲染在sidebar中*/
    $.get('api/interface.php',
        {
            'cmd': 'shopInfo'
        },
        function (data, status) {
            var jsonData = JSON.parse(data);
            var result = {
                data: jsonData
            };
            var inner = template('tplSidebar', result);
            document.getElementById('sidebar').innerHTML = inner;

            /*点击sidebar之后，获取相关信息，渲染在content中*/
            $(".shop").click(function () {
                var productCode = $(this).html();

                /*加载content内容*/
                $('#content').load('content.html', function () {
                    $("#productCode").html(productCode);

                    $.get('api/interface.php',
                        {
                            cmd: 'getProductInfo',
                            productCode: productCode
                        },
                        function (data, status) {
                            var datas = JSON.parse(data);
                            console.log(datas);
                            console.log(datas.price);
                            $('#productPrice').val(datas.price);
                            $('#productQty').val(datas.qty);
                            $('#productInfoCode').val(productCode);
                        });

                    /*获取商品的计划，并且可以删除*/
                    $.get('api/interface.php',
                        {
                            cmd: 'getPlan',
                            productCode: productCode
                        },
                        function (data, status) {
                            var jsonData = JSON.parse(data);
                            var result = {
                                data: jsonData,
                                productCode: productCode
                            };

                            var inner = template('tplContent', result);
                            document.getElementById('planed').innerHTML = inner;

                            /*提交新的计划*/
                            $("#submit").click(function () {
                                alert('submit');
                                $.get('api/interface.php',
                                    {
                                        'cmd': 'addPlan',
                                        'productCode': productCode,
                                        'dateTag': $('#dateTag').val(),
                                        'weekTag': $('#weekTag').val(),
                                        'timeTag': $('#timeTag').val(),
                                        'price': $('#price').val(),
                                        'percent': $('#percent').val(),
                                        'startTime': $('#startTime').val(),
                                        'endTime': $('#endTime').val()
                                    },
                                    function (data, status) {
                                    });
                            });
                        });
                });
            });
        });
});