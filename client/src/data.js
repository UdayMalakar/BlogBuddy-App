var data=[]
async function getdata(){
    try{

        let response = await  fetch('http://localhost:5000/api/v1/blog/getAllCategory');
        let output=await response.json();
        console.log(output.GetAllCategory);
        data=output.GetAllCategory

    }catch(error)
    {
        console.log(error);
    }
}

getdata();
console.log("data :",data);
export default data;
