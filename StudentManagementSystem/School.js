export var SMS;
(function (SMS) {
    class Student {
        StudentId = "";
        StudentName = "";
        StudentAddress = "";
        AmountPayable = 0;
        AmountPaid = 0;
    }
    SMS.Student = Student;
    function ShowStatus(s) {
        return `Student Id : ${s.StudentId} Student Name : ${s.StudentName} Student Address : ${s.StudentAddress} Balance Amount : ${s.AmountPayable - s.AmountPaid}`;
    }
    SMS.ShowStatus = ShowStatus;
    function StudentBalance(s) {
        return s.AmountPayable - s.AmountPaid;
    }
    SMS.StudentBalance = StudentBalance;
    class StudentCourses {
        StudentId = "";
        CourseTitle = "";
        CourseFees = 0;
        constructor(id, title, fees) {
            this.StudentId = id;
            this.CourseTitle = title;
            this.CourseFees = fees;
        }
    }
    SMS.StudentCourses = StudentCourses;
})(SMS || (SMS = {}));
