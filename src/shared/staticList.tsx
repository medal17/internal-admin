import { BiCheck } from "react-icons/bi"
import { IoClose } from "react-icons/io5"
// import PendingLoan from '../assets/images/pending-loan.svg'

const date=new Date()
export const VehicleMake=[
    {id:1, value:'SUV'},
    {id:2, value:'Jeep'},
]

export const loanTypes=[
    {id:1, value:'Personal Loan'}, 
    {id:2, value:'Payday Loan'}, 
    {id:3, value:'SME Loan'},
]

export const employmentStatus=[
    {id:1, value:'Employed'}, 
    {id:2, value:'Unemployed'}, 
    {id:3, value:'Self-employed'}, 
]


export const additionalList=[
    {label:'First Name', key:'firstName', type:'text'},
    {label:'Last Name', key:'lastName', type:'text'},
    {label:'Phone Number', key:'phoneNumber',type:'number', maxLength:11},
    {label:'BVN', type:'number', key:'bvn', maxLength:16},
    {label:'NIN', type:'text',key:'nin'},
    {label:'Next of Kin', type:'name', key:'nextOfKin'},
    {label:'Relationship', type:'select', key:'relationship', placeholder:'Select a Relationship',
    options:[
        {id:1, value:'Husband'}, 
        {id:2, value:'Wife'},
        {id:3, value:'Child'},
        {id:3, value:'Brother'},
        {id:3, value:'Sister'},
        {id:3, value:'Mother'},
        {id:3, value:'Father'},
        {id:3, value:'Relative'},
        {id:3, value:'Other'},        
    ]},
    {label:'Next of Kin\'s Phone Number', key:'phoneNumber1',type:'number', maxLength:11},

    {label:'Your Address', type:'text', key:'address'},
    {label:'Repayment Option', type:'select', key:'repaymentOption', 
     placeholder:'Select a repayment option',
     options:[
            {id:1, value:'Remita Inflight'}, 
            {id:2, value:'Tokenized Card Payment (TCP)'},
            {id:3, value:'Remita Direct Debit (RDD)'}
        ]
    },
    // {label:'Proof of Employment', key:'proof', type:'file', index:0},
    // {label:'Identification Document', key:'identityDoc', type:'file', index:1},
    // {label:'Proof of Address', key:'proofOfAddress',type:'file', index:2},
    // {label:'6 Months Bank Statement', key:'bankStatement', type:'file', index:3}
]

export const dashboardCardData = [
    {
        title: 'ACTIVE LOANS',
        key: 'activeLoans',
        count: 0,
        icon: <BiCheck className='text-lightGreen text-lg bg-lightGreen bg-opacity-10 xl:h-12 h-10 xl:w-12 w-10 p-1 font-extrabold rounded-full' />,
        tooltip: 'Approved loans that currently open and being paid off'
    },
    // {
    //     title: 'PENDING LOANS',
    //     key: 'pendingLoans',
    //     count: 0,
    //     icon: <img src={PendingLoan} alt='pending-icon' className='bg-orange p-2.5 xl:h-12 h-10 xl:w-12 w-10 bg-opacity-20 rounded-full' />,
    //     tooltip: 'Loans awaiting a decision from the lender.'
    // },
    {
        title: 'DENIED LOANS',
        key:'deniedLoans',
        count: 0,
        icon: <IoClose className='bg-red py-2 text-[40px] xl:h-12 h-10 xl:w-12 w-10 text-red bg-opacity-10 rounded-full' />,
        tooltip: 'Loan requests declined by lender.'
    },
    {
        title: 'SETTLED LOANS',
        count: 0,
        key:'settledLoans',
        icon: <BiCheck className='bg-[#E8E9E8] py-2 text-[40px] xl:h-12 h-10 xl:w-12 w-10 text-black rounded-full' />,
        tooltip: 'Loans that have been paid off in full'
    },
]

export const APPLICATION_TITLE =[
    {key:'requestedAmount',title:'Amount' },
    {key:'totalAmountPayable',title:'Total Amount Payable' },
    {key:'monthlyRepaymentAmount',title:'Monthly Repayment' },
    {key:'interest',title:'Interest' },
    {key:'fees',title:'Fees' },
    {key:'loanType',title:'Type' },
    {key:'duration',title:'Tenor' },
    {key:'repaymentMethod',title:'Repayment Method' }
]

export const BenefitData = [
    {Benefits:'Damages to third party cars or properties up to the tune of ₦1million.', Status:'Covered'},
    {Benefits:'Damages to third party cars or properties up to the tune of ₦1million.', Status:'Covered'},
    {Benefits:'Damages to third party cars or properties up to the tune of ₦1million.', Status:'Covered'},
    {Benefits:'Damages to third party cars or properties up to the tune of ₦1million.', Status:'Covered'},
    {Benefits:'Damages to third party cars or properties up to the tune of ₦1million.', Status:'Covered'},
    
]

export const VEHICLE_TYPES= [
    {id:1, value:'Car'}, 
    {id:2, value:'Truck'}, 
    {id:3, value:'Tricycle'},
    {id:4, value:'Bus'},
    {id:5, value: 'Motorcycle'}
]

export const VEHICLE_CLASS= [
    {id:1, value:'Private'}, 
    {id:2, value:'Commercial'}
]

export const BUSINESS_TYPE=[
    {id:1, value:'Sole proprietorship'},
    {id:2, value:'Partnership'},
    {id:3, value:'Corporations'},
    {id:4, value:'Limited Liability Company'}
]

export const BUSINESS_INDUSTRY=[
    {id:1, value:'Agriculture'},
    {id:2, value:'Banking'},
    {id:3, value:'Health'},
    {id:4, value:'Education'},
    {id:5, value:'Finance'},
    {id:6, value:'Computer'},
    {id:7, value:'Communications'},
    // {id:8, value:'Agriculture'}
    
]

export const TOP_QUESTIONS= [
    {
        heading:'How do I change my account email?',
        body:`First, you can start by heading over to your log in to your account and change it from your Profile
     > Edit Profile. Then go to the general tab to change your email.`
    },
    {
        heading:'What should I do if my payment fails?',
        body:`If your payment fails, you can use the (COD) payment option, if available on that order. 
        If your payment is debited from your account after a payment failure, it will be credited back within 7-10 days.`
    },
    {
        heading:'What is your cancellation policy?',
        body:`You can now cancel an order when it is in packed/shipped status. Any amount paid will 
        be credited into the same payment mode using which the payment was made`
    },

]

export const walletHistoryStatic=[
    {Amount:'5,000', Transaction:'Loan Disbursement', Type:'Credit', Date:'10-10-2022'},
    {Amount:'5,000', Transaction:'Loan Disbursement', Type:'Credit', Date:'10-10-2022'},
    {Amount:'5,000', Transaction:'Loan Disbursement', Type:'Credit', Date:'10-10-2022'},
    {Amount:'5,000', Transaction:'Loan Disbursement', Type:'Credit', Date:'10-10-2022'},
    {Amount:'5,000', Transaction:'Loan Disbursement', Type:'Credit', Date:'10-10-2022'},
    {Amount:'5,000', Transaction:'Loan Repayment', Type:'Debit', Date:'10-10-2022'},
    {Amount:'5,000', Transaction:'Loan Repayment', Type:'Debit', Date:'10-10-2022'},
    {Amount:'5,000', Transaction:'Loan Repayment', Type:'Debit', Date:'10-10-2022'},
    {Amount:'5,000', Transaction:'Loan Repayment', Type:'Debit', Date:'10-10-2022'},
    {Amount:'5,000', Transaction:'Loan Repayment', Type:'Debit', Date:'10-10-2022'},
]

export const CLAIMS_DUMMY=[
    {provider:'AXA MAnsard', type:'Insurance Purchase',expiryDate:'10-10-2022'},
    {provider:'AXA MAnsard', type:'Insurance Purchase',expiryDate:'10-10-2022'},
    {provider:'AXA MAnsard', type:'Insurance Purchase',expiryDate:'10-10-2022'},
    {provider:'AXA MAnsard', type:'Insurance Purchase',expiryDate:'10-10-2022'},
    {provider:'AXA MAnsard', type:'Insurance Purchase',expiryDate:'10-10-2022'},
    {provider:'AXA MAnsard', type:'Insurance Purchase',expiryDate:'10-10-2022'},
    {provider:'AXA MAnsard', type:'Insurance Purchase',expiryDate:'10-10-2022'},
]

export const STEPS_TO_FUND_WALLET=[
    {id:1, text:'Copy account number'},
    {id:2, text:'Log into you internet/Mobile Banking platform'},
    {id:3, text:'Select Send and transfer Money'},
    {id:4, text:'Select Polaris Bank as Bank to make transfer'},
    {id:5, text:'Paste the account number you copied in step 1'},
    {id:6, text:'Verify that your name appears as the beneficiary'},
    {id:7, text:'Complete the transaction'},
]

export const DOCUMENT_DUMMY =[
    {name:'Passport Doc.png', type:'Means of Identification', date:{date}, image:''},
    {name:'Passport.png',type:'Means of Identification', date:{date}, image:''},
    {name:'Passport.png', type:'Means of Identification', date:{date}, image:''},
    {name:'Passport.png',type:'Means of Identification', date:{date}, image:''},
    {name:'Passport.png', type:'Means of Identification',date:{date}, image:''},
    {name:'Passport.png',type:'Means of Identification', date:{date}, image:''},
    {name:'Passport.png',type:'Means of Identification', date:{date}, image:''},
    {name:'Passport.png',type:'Means of Identification', date:{date}, image:''},
]

export const CERTIFICATE_LIST =[
    {provider:'Axa Mansard',type:'Motor Insurance', date:{date}},
    {provider:'Axa Mansard',type:'Motor Insurance', date:{date}},
    {provider:'Axa Mansard',type:'Motor Insurance', date:{date}},
    {provider:'Axa Mansard',type:'Motor Insurance', date:{date}},
    {provider:'Axa Mansard',type:'Motor Insurance', date:{date}},
    {provider:'Axa Mansard',type:'Motor Insurance', date:{date}},
    {provider:'Axa Mansard',type:'Motor Insurance', date:{date}},
    {provider:'Axa Mansard',type:'Motor Insurance', date:{date}},
    {provider:'Axa Mansard',type:'Motor Insurance', date:{date}},
    {provider:'Axa Mansard',type:'Motor Insurance', date:{date}},
]

export const REPORT_LIST =[
    {policy:'John Doe', status:'Successful',amount:10000,provider:'Axa Mansard',type:'Payday Loan', date:`${date}`},
    {policy:'John Doe', status:'Successful',amount:10000,provider:'Axa Mansard',type:'SME Loan', date:`${date}`},
    {policy:'John Doe', status:'Successful',amount:10000,provider:'Axa Mansard',type:'SME Loan', date:`${date}`},
    {policy:'John Doe', status:'Successful',amount:10000,provider:'Axa Mansard',type:'SME Loan', date:`${date}`},
    {policy:'John Doe', status:'Successful',amount:10000,provider:'Axa Mansard',type:'SME Loan', date:`${date}`},
    {policy:'John Doe', status:'Successful',amount:10000,provider:'Axa Mansard',type:'SME Loan', date:`${date}`},
    {policy:'John Doe', status:'Successful',amount:10000,provider:'Axa Mansard',type:'SME Loan', date:`${date}`},
    {policy:'John Doe', status:'Successful',amount:10000,provider:'Axa Mansard',type:'SME Loan', date:`${date}`},
    
]

export const COMPARE_LIST =[
    {tenor:'3-Months',provider:'Axa Mansard',interest:'3%', maxAmount:100000},
    {tenor:'3-Months',provider:'Axa Mansard',interest:'3%', maxAmount:100000},
    {tenor:'3-Months',provider:'Axa Mansard',interest:'3%', maxAmount:100000},
    {tenor:'3-Months',provider:'Axa Mansard',interest:'3%', maxAmount:100000},
    {tenor:'3-Months',provider:'Axa Mansard',interest:'3%', maxAmount:100000},
    {tenor:'3-Months',provider:'Axa Mansard',interest:'3%', maxAmount:100000},
]

export const notificationList = [
    {title:'Re-apply for Loan', message:'Your Loan with Ishu loans will expire 12:00pm 27th June 2022 find the link to re-apply', type:'Approval' },
    {title:'Re-apply for Loan', message:'Your Loan with Ishu loans will expire 12:00pm 27th June 2022', type:'Approval' },
    // {title:'Re-apply for Loan', message:'Your Loan with Ishu loans will expire 12:00pm 27th June 2022', type:'Approval' },
    // {title:'Re-apply for Loan', message:'Your Loan with Ishu loans will expire 12:00pm 27th June 2022', type:'Approval' },
    // {title:'Re-apply for Loan', message:'Your Loan with Ishu loans will expire 12:00pm 27th June 2022', type:'Approval' },
]

export const repaymentCard =[
    {key:'totalRepayment',name:'Total Balance'}, 
    {key:'totalRepayment',name:'Loan Balance'}, 
    {key:'totalInterestCharged',name:'Total Interest Charge'}, 
    {key:'accruedInterest',name:'Accrued Interest'}, 
       
]

export const RepaymenTables = [
    {key:'dueDate',name:'Due Date'}, 
    {key:'principalAmount',name:'Principal Amount'},
    {key:'interestAmount',name:'Interest Payment'},
    {key:'totalAmount',name:'Total Amount Payable'}, 
    {key:'status',name:'Status'}
]

export const StatementTables = [
    {key:'dueDate',name:'Date'}, 
    {key:'status',name:'Transaction Description'},
    {key:'debit',name:'Debit'},
    {key:'principalAmount',name:'Credit'},
    {key:'totalAmount',name:'Balance'}
]
export const steps = [
        'Loan Application',
        'Application Recieved',
        'Reviewing Documents',
        'Application Approved',
        'Disbursement',
        'Application Completed',
    ];