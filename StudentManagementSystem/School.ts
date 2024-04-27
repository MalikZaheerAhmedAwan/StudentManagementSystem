export namespace SMS 
{
export class Student 
{
public StudentId : string=""; 
public StudentName : string="";
public StudentAddress : string="";
public AmountPayable : number=0;
public AmountPaid : number=0;

}
    export function ShowStatus(s : SMS.Student) : string
    {
        return `Student Id : ${s.StudentId} Student Name : ${s.StudentName} Student Address : ${s.StudentAddress} Balance Amount : ${s.AmountPayable- s.AmountPaid}`
    }

 export function StudentBalance(s : SMS.Student):number {
    return s.AmountPayable-s.AmountPaid;
 }


    export class StudentCourses {
    public StudentId : string="";
    public CourseTitle : string="";
    public CourseFees : number=0;
constructor (id:string , title:string,fees:number)
{
this.StudentId=id;
this.CourseTitle=title;
this.CourseFees=fees;
}

}


}