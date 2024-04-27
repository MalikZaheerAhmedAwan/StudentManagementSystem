
import inquirer from 'inquirer';
import { customAlphabet } from 'nanoid'
import { SMS } from './School.js';
const nanoid = customAlphabet('1234567890', 10)

let students: SMS.Student[] = [];
let courses: SMS.StudentCourses[] = [];

const CoursesOffers : any ={'.NET Core - 25000' : 25000,'Android Develper - 12000' : 12000,'Web Development - 20000' : 20000, 'Phython - 18000':18000, 'Data Science - 10000' : 10000,'BlockChain - 22000' : 22000,'CyberSecurity - 30000' :30000}

let repeat=true;

while (repeat==true) 
{

console.log("***** Student Management System *****");



let menu= await inquirer.prompt([{name:"choice", type:"list", choices:["Add Student","Enroll Student In Course","View Student Balance","Pay Student Fees","Student Status","Student List"]}]); 



if (menu.choice=="Add Student")
{
let info = await inquirer.prompt([
    {name:"stuName", type:"string",message:"Please Enter Student Name :"},
    {name:"stuAddress", type:"string",message:"Please Enter Student Address :"},
]);
let student = new SMS.Student;
student.StudentId=nanoid(5);
student.StudentName=info.stuName;
student.StudentAddress=info.stuAddress;

students.push({StudentId: student.StudentId, StudentName: student.StudentName , StudentAddress: student.StudentAddress , AmountPayable:0 , AmountPaid:0});
console.log(`Student Name : ${student.StudentName} with Auto Generated ID : ${student.StudentId} has been registered.`);
}


if (menu.choice=="Enroll Student In Course")
{
    let course = await inquirer.prompt([
        {name:"SId", type:"string",message:"Please Enter Student Id to Enroll in Course :"},
        {name:"CName", type:"list" , choices:['.NET Core - 25000','Android Develper - 12000','Web Development - 20000', 'Phython - 18000', 'Data Science - 10000','BlockChain - 22000','CyberSecurity - 30000'], message:"Please Enter Student Address :"},
    ]);
    let pos=StudentExist(course.SId);
if (pos!=-1)
{
    let feeAmount =CoursesOffers[course.CName];
    let studentCourse = new SMS.StudentCourses(course.SId,course.CName,feeAmount);

    courses.push({StudentId: studentCourse.StudentId, CourseTitle: studentCourse.CourseTitle, CourseFees:studentCourse.CourseFees });
    students[pos].AmountPayable=students[pos].AmountPayable+studentCourse.CourseFees;

}
else 
console.log(`Student with this ID : ${course.SId} not exist ...`);
}

if (menu.choice=="View Student Balance")
{
    let stu = await inquirer.prompt([
        {name:"SId", type:"string",message:"Please Enter Student Id to view Status :"}]);

        let pos=StudentExist(stu.SId);
        if (pos!=-1)
        {
        let student=students[pos];
        console.log(`Student Balance Amount : ${SMS.StudentBalance(student) }`)
}
else 
console.log(`Student with this ID : ${stu.SId} not exist ...`);
}


if (menu.choice=="Student Status")
{
    let stu = await inquirer.prompt([
        {name:"SId", type:"string",message:"Please Enter Student Id to view Status :"}]);

        let pos=StudentExist(stu.SId);
        if (pos!=-1)
        {
        let student=students[pos];

let ss:string = SMS.ShowStatus(student);
console.log(ss);
console.log("Student Enroll in Courses")
for (let x=0 ; x<courses.length;x++)
{
    let studentCourse= courses[x];
if (courses[x].StudentId==student.StudentId )
{
    let sc:string = courses[x].CourseTitle;
console.log(sc);
}
}
}
else 
console.log(`Student with this ID : ${stu.SId} not exist ...`);
}


if (menu.choice=="Pay Student Fees")
{
    let stu = await inquirer.prompt([
        {name:"SId", type:"string",message:"Please Enter Student Id to pay fees :"}]);

        let pos=StudentExist(stu.SId);
        if (pos!=-1)
        {
        let student=students[pos];
let balanceAmount=SMS.StudentBalance(student)
        console.log(`Student Balance Amount : ${balanceAmount }`)
 
        let fee = await inquirer.prompt([
            {name:"paid", type:"number",message:"Please Enter amount to pay fees :"}]);

            if (fee.paid<=balanceAmount)
            {
            students[pos].AmountPaid=students[pos].AmountPaid+fee.paid;

            student=students[pos];

            console.log(`Now Your's Remaining Balance Amount : ${SMS.StudentBalance(student) }`)
            }
            else
            console.log(`You have to pay only Balance Amount that is : ${SMS.StudentBalance(student) }`)
}
else 
console.log(`Student with this ID : ${stu.SId} not exist ...`);
}




if (menu.choice=="Student List")
{

for (let x=0 ; x<students.length;x++)
{
    let student=students[x];
let ss:string = SMS.ShowStatus(student);
console.log(ss);
}
}


let ans = await inquirer.prompt([{name:"isContinue",type:"confirm",message:"Do You Want to Contine ...... (y/n): ",
default:"true"}
]);
repeat=ans.isContinue;


}

function StudentExist(sName :string): number
{
let index=-1;
for (let x=0 ; x<students.length;x++)
    if (sName==students[x].StudentId)
    index=x;
return index;
}

