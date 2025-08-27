const table = document.querySelector('table.table-permission')
const btnUpdate = document.querySelector('.btn-update')
const formUpdate = document.querySelector('[form-update-permissions]')
const inputForm = formUpdate.querySelector('input')
if(table){
    btnUpdate.addEventListener("click", ()=>{
        const permissions = []
        const rows = table.querySelectorAll('tbody tr')
        rows.forEach((row)=> {
            const inputs = row.querySelectorAll('td input')
            inputs.forEach((input,index)=> {
                if(input.type == 'text'){
                    permissions.push({
                        id:input.value,
                        permissions:[]
                    })
                }else{
                    if(input.checked){
                        permissions[index].permissions.push(row.dataset.name)
                    }
                }
            })
            
        })
        
        inputForm.value = JSON.stringify(permissions)
        formUpdate.submit()
        
    })
}
