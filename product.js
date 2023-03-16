// modal open and close
$('#fade').click(function () {

    $("#ex1").modal({
        fadeDuration: 500,
        fadeDelay: 0.50,
        escapeClose: false,
        clickClose: false,
    });
})

const toggleBtn = document.querySelector('.bars')
const toggleIcon = document.querySelector('.bars i')
const tabs = document.querySelector('.__tabs')

toggleBtn.onclick = function () {
    tabs.classList.toggle('open');
    const isOpen = tabs.classList.contains('open')
    toggleIcon.classList = isOpen ? 'fa fa-xmark fa-2x' : 'fa fa-bars fa-2x'
}


const pid = document.getElementById('pid');
const pname = document.getElementById('pname');
const price = document.getElementById('price');
const desc = document.getElementById('desc');
const pimg = document.getElementById('pimg');
var url;
// file reader for image to store in local storage
pimg.addEventListener('change', function (e) {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
        url = reader.result
    });

})

// generate Id of product
$('#gen').click(function (e) {
    e.preventDefault()
    pid.value = Date.now()
})

// Show product from the local storage
function showProduct() {
    var productList;
    if (localStorage.getItem("product") === null) {
        productList = []
    }
    else {
        productList = JSON.parse(localStorage.getItem("product"))
    }

    var data = ""
    productList.forEach((ele, index) => {
        data += `<tr style='transition:all 1s;background-color: #2E4053;'><td>${index + 1})</td><td>${ele.pid}</td>
        <td>${ele.pname}</td>
        <td><div style='width:100px;height:100px;display:flex;align-items:center;'><img id='product-img' style='max-width:100%;max-height:100%;' src='${ele.pimg}'/></div></td>
        <td>${ele.price}</td>
        <td>${ele.desc}</td>
        <td><button style='padding:10px;color:#0086AE;cursor:pointer;background-color:#B2EDFF;outline:none;border:none' onclick='updateProduct(${ele.pid})'><i class='fa fa-pen-to-square'></i></button></td>
        <td><button style='padding:10px;color:red;cursor:pointer;background-color:#FFDCD9;outline:none;border:none' onclick='deleteProduct(${ele.pid})'><i class='fa fa-trash'></i></button></td>`
    });

    document.getElementById('product-list').innerHTML = data.length ? data : `<tr style='text-align:center'><td colspan='8'><div style='display:flex;justify-content:center;align-items:center'><img width='60px' height='60px' src='https://cdn-icons-png.flaticon.com/512/9841/9841553.png'/><span style='font-size:20px;margin-left:14px'>There is no product!</span></td></tr>`
}
showProduct()

function debounce(func,timer=800){
    let time;
    return function(...args){
        clearTimeout(time)
        time = setTimeout(()=>{
            func.apply(this,args)
        },timer)
    }
}

function filerProduct(){
    var productList;
    if (localStorage.getItem("product") === null) {
        productList = []
    }
    else {
        productList = JSON.parse(localStorage.getItem("product"))
    }
    var res = productList.filter(ele => ele.pname.toLowerCase().includes(this.value.toLowerCase()) || ele.pid.includes(this.value))
    var data = ""
    res.forEach((ele, index) => {
        data += `<tr style='transition:all 1s;background-color: #2E4053;'><td>${index + 1})</td><td>${ele.pid}</td>
        <td>${ele.pname}</td>
        <td><div style='width:100px;height:100px;display:flex;align-items:center;'><img id='product-img' style='max-width:100%;max-height:100%;' src='${ele.pimg}'/></div></td>
        <td>${ele.price}</td>
        <td>${ele.desc}</td>
        <td><button style='padding:10px;color:#0086AE;cursor:pointer;background-color:#B2EDFF;outline:none;border:none' onclick='updateProduct(${ele.pid})'><i class='fa fa-pen-to-square'></i></button></td>
        <td><button style='padding:10px;color:red;cursor:pointer;background-color:#FFDCD9;outline:none;border:none' onclick='deleteProduct(${ele.pid})'><i class='fa fa-trash'></i></button></td>`
    });

    document.getElementById('product-list').innerHTML = data.length ? data : `<tr style='text-align:center'><td colspan='8'><div style='display:flex;justify-content:center;align-items:center'><img width='60px' height='60px' src='https://cdn-icons-png.flaticon.com/512/9841/9841553.png'/><span style='font-size:20px;margin-left:14px'>There is no product!</span></td></tr>`
}

// filter the product
$('#search').keyup(debounce(filerProduct))

// update particular product from the list of products
function updateProduct(productid) {
    $("#ex1").modal({
        fadeDuration: 500,
        fadeDelay: 0.50,
    });
    document.getElementById('submit').style.display = 'none'
    document.getElementById('update').style.display = 'block'
    var productList;
    if (localStorage.getItem("product") === null) {
        productList = []
    }
    else {
        productList = JSON.parse(localStorage.getItem("product"))
    }
    let index = productList.findIndex(item=> item.pid==productid )
    pid.value = productList[index].pid
    pname.value = productList[index].pname
    price.value = productList[index].price
    desc.value = productList[index].desc
    url = productList[index].pimg

    $('#update').click(function (e) {
        e.preventDefault()
        if (pid.value == "" || pname.value == "" || price.value == "" || desc.length < 20 || desc.value == "" || url == "") {
            document.getElementById('err').style.display = 'block';
            setTimeout(() => {
                document.getElementById('err').style.display = 'none';

            }, 2000)
            return;
        }

        productList[index].pid = pid.value
        productList[index].pname = pname.value
        productList[index].price = price.value
        productList[index].desc = desc.value
        productList[index].pimg = url
        localStorage.setItem('product', JSON.stringify(productList))
        showProduct()
    })
}

// delete particular product from the list of products
function deleteProduct(productid) {

    var productList;
    if (localStorage.getItem("product") === null) {
        productList = []
    }
    else {
        productList = JSON.parse(localStorage.getItem("product"))
    }
    let index = productList.findIndex(item=> item.pid==productid )
    var confirm = window.confirm(`Are you sure want to delete ${productList[index].pname} ?`)

    if(confirm){
        productList.splice(index, 1)
        console.log(productList);
        localStorage.setItem('product', JSON.stringify(productList))
        showProduct()

    }

}

// show data on web page that's store in local storage
// $('#productForm').validate()

// sort the products
$('#sort').change(function (e) {
    var target = e.target.value;
    var productList;
    if (localStorage.getItem("product") === null) {
        productList = []
    }
    else {
        productList = JSON.parse(localStorage.getItem("product"))
    }

    if (target == 'price') {
        productList = productList.sort((a, b) => Number(a[target]) - Number(b[target]))
    }
    else {
        productList = productList.sort((a, b) => a[target].toLowerCase() > b[target].toLowerCase() ? 1 : -1)
    }
    var data = ""
    productList.forEach((ele, index) => {
        data += `<tr style='transition:all 1s;background-color: #2E4053;'><td>${index + 1})</td><td>${ele.pid}</td>
        <td>${ele.pname}</td>
        <td><div style='width:100px;height:100px;display:flex;align-items:center;'><img id='product-img' style='max-width:100%;max-height:100%;' src='${ele.pimg}'/></div></td>
        <td>${ele.price}</td>
        <td>${ele.desc}</td>
        <td><button style='padding:10px;color:#0086AE;cursor:pointer;background-color:#B2EDFF;outline:none;border:none' onclick='updateProduct(${ele.pid})'><i class='fa fa-pen-to-square'></i></button></td>
        <td><button style='padding:10px;color:red;cursor:pointer;background-color:#FFDCD9;outline:none;border:none' onclick='deleteProduct(${ele.pid})'><i class='fa fa-trash'></i></button></td>`
    });

    document.getElementById('product-list').innerHTML = data.length ? data : `<tr style='text-align:center'><td colspan='8'><div style='display:flex;justify-content:center;align-items:center'><img width='60px' height='60px' src='https://cdn-icons-png.flaticon.com/512/9841/9841553.png'/><span style='font-size:20px;margin-left:14px'>There is no product!</span></td></tr>`
})



// store data to the local storage
$('#submit').click(function (e) {
    e.preventDefault()
    if (pid.value == "" || pname.value == "" || price.value == "" || desc.length < 20 || desc.value == "" || url == "") {
        document.getElementById('err').style.display = 'block';
        setTimeout(() => {
            document.getElementById('err').style.display = 'none';

        }, 2000)
        return;
    }
    var productList;
    if (localStorage.getItem("product") === null) {
        productList = []
    }
    else {
        productList = JSON.parse(localStorage.getItem("product"))
    }

    productList.push({
        pid: pid.value,
        pname: pname.value,
        price: price.value,
        desc: desc.value,
        pimg: url
    })

    localStorage.setItem("product", JSON.stringify(productList))
    showProduct()
    pid.value = ""
    pname.value = ""
    price.value = ""
    desc.value = ""
    url = ""
})


// filter by price 
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    var productList;
    if (localStorage.getItem("product") === null) {
        productList = []
    }
    else {
        productList = JSON.parse(localStorage.getItem("product"))
    }

    productList = productList.filter(ele => Number(ele.price) <= this.value)
    var data = ""
    productList.forEach((ele, index) => {
        data += `<tr style='transition:all 1s;background-color: #2E4053;'><td>${index + 1})</td><td>${ele.pid}</td>
        <td>${ele.pname}</td>
        <td><div style='width:100px;height:100px;display:flex;align-items:center;'><img id='product-img' style='max-width:100%;max-height:100%;' src='${ele.pimg}'/></div></td>
        <td>${ele.price}</td>
        <td>${ele.desc}</td>
        <td><button style='padding:10px;color:#0086AE;cursor:pointer;background-color:#B2EDFF;outline:none;border:none' onclick='updateProduct(${ele.pid})'><i class='fa fa-pen-to-square'></i></button></td>
        <td><button style='padding:10px;color:red;cursor:pointer;background-color:#FFDCD9;outline:none;border:none' onclick='deleteProduct(${ele.pid})'><i class='fa fa-trash'></i></button></td>`
    });

    document.getElementById('product-list').innerHTML = data.length ? data : `<tr style='text-align:center'><td colspan='8'><div style='display:flex;justify-content:center;align-items:center'><img width='60px' height='60px' src='https://cdn-icons-png.flaticon.com/512/9841/9841553.png'/><span style='font-size:20px;margin-left:14px'>There is no product!</span></td></tr>`
}