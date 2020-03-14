class UI{
    constructor(){
        this.budgetinput=document.querySelector('.input-budget');
        this.budgetform=document.querySelector('.budget-form');  
        this.expensetype=document.querySelector('.input-expense-type');
        this.expensevalue=document.querySelector('.input-expense-value');   
        this.budgetamount=document.querySelector('.budget-amount');   
        this.expeseamount=document.querySelector('.expense-amount');   
        this.balanceamount=document.querySelector('.balance-amount');   
        this.tablelist=document.querySelector('.table-list');
        this.id=0;
        this.expensearray=[];
    }

    submitBudget(){
        let budgetamount=this.budgetinput.value;
        if(budgetamount==='' || budgetamount<0){
            this.showalert();
            this.budgetinput.value='';
          
        }

        
        else{
            this.budgetamount.innerHTML=budgetamount;
            this.budgetinput.value='';
            let totalexpense= this.expensearray.reduce(function(acc, curr){
                acc+=parseInt(curr.amount);
        
                return acc;
            },0)            
            
            this.showBalance(totalexpense);
        }
        
            }
    showalert(){
        let budgetgroup=document.querySelector('.budget-group');
        let budgetboxes=document.querySelector('.budget-boxes');
        let div=document.createElement('div');
        div.className='alert';
        div.innerHTML= `<p>The field cannot be empty or have a negative value</p>`;
        budgetboxes.insertBefore(div,budgetgroup);
        setTimeout(()=>{
            div.classList.add('none');
        },3000);
        div.classList.remove('none');
        
    }
    submitExpense(){
        let expensevalue=this.expensevalue.value;
        let expensetype=this.expensetype.value;
        if(expensetype==='' || expensevalue==='' || expensevalue<0){
            this.showexpesealert();
            this.expensevalue.value='';
            this.expensetype.value='';
       }else{
            let list={
                id:this.id,
                title: expensetype,
                amount:expensevalue,
            } 
            this.expensearray.push(list);
            this.expensevalue.value='';
            this.expensetype.value='';
            let totalexpense=this.expensearray.reduce(function(acc,curr){
                acc+=parseInt(curr.amount);
                return acc;
            },0);
            this.expeseamount.innerHTML=totalexpense;
            this.showBalance(totalexpense);
            let table=document.querySelector('.table');
            let row=document.createElement('tr');
            row.className='expenserow';
            row.innerHTML=`<td class="black">${list.title}</td>
                            <td>-${list.amount}</td>
                            <td><p class="edit" data-id="${list.id}">edit</p></td>
                            <td><p class="delete" data-id="${list.id}">delete</p></td>
                            `
            row.style.color='red';                                      
            table.appendChild(row); 
            this.id++;
            
        }


    }
    showBalance(totalexpense){
        
        if(this.budgetamount.textContent===''){
            this.balanceamount.innerHTML=-totalexpense;
        }
        else{            
            let budget=parseInt(this.budgetamount.textContent);
            let balance=budget-totalexpense;
           this.balanceamount.innerHTML=balance;
    

        }

    }
    showexpesealert(){
        let expensegroup=document.querySelector('.expense-group');
        let container=document.querySelector('.mycontainer');
        let div=document.createElement('div');
        div.className='expensealert';
        div.innerHTML= `<p> No empty or negative values</p>`;
        container.appendChild(div);
        setTimeout(()=>{
            div.classList.add('none');
        },3000);
        div.classList.remove('none');
        
    }
    
    editList(element,target){
        let self=this.expenseamount;
        //remove from dom
        let table=document.querySelector('.table');
        table.removeChild(target.parentElement.parentElement);
         //if(expense.id===element){
         //}    
        let remove= this.expensearray.filter(function(expense){
            return expense.id==element;
        })    
       //updated expnese array
      let updatedarray=this.expensearray.filter(function(expense){
          return expense.id!=element;
      })
        this.expensearray=updatedarray;
        let totalexpense= this.expensearray.reduce(function(acc, curr){
            acc+=parseInt(curr.amount);
            return acc;
        },0)            
        this.expeseamount.innerHTML=totalexpense;
        this.showBalance(totalexpense);
        this.expensetype.value=remove[0].title;
        this.expensevalue.value=remove[0].amount;
    

    }
}

// add event listner when the dom content loads;
document.addEventListener('DOMContentLoaded',addeventlisteners);
//initialize the class ui

function addeventlisteners(){
    let ui=new UI();
    
    const tablelist=document.querySelector('.table-list');
    const expenseform=document.querySelector('.expense-form');
    const budgetform=document.querySelector('.budget-form');

    budgetform.addEventListener('submit',(e)=>{
        ui.submitBudget();
        e.preventDefault();
    })
    tablelist.addEventListener('click',(e)=>{
        if(e.target.classList.contains('edit')){
            ui.editList(e.target.dataset.id,e.target);
        }
        else if(e.target.classList.contains('delete')){
            ui.deleteList(e.target.dataset.id);
        }
    })
    expenseform.addEventListener('submit',(e)=>{
        ui.submitExpense();
        e.preventDefault();
        
    })
}
