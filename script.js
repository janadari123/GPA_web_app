document.addEventListener("DOMContentLoaded", function () {
    const gpaForm = document.getElementById("gpaForm");
    const addCourseBtn = document.getElementById("addCourse");
    const calculateGpaBtn = document.getElementById("calculateGPA");
    const resultDiv = document.getElementById("result");

    let courses = [];

    addCourseBtn.addEventListener("click", function () {
        const courseName = document.getElementById("courseName").value;
        const grade = document.getElementById("grade").value;
        const creditHours = parseFloat(document.getElementById("creditHours").value);

        if (!courseName || !grade || isNaN(creditHours) || creditHours <= 0) {
            alert("Please fill all fields with valid values.");
            return;
        }

        courses.push({ courseName, grade, creditHours });
        gpaForm.reset();
    });

    calculateGpaBtn.addEventListener("click", function () {
        if (courses.length === 0) {
            alert("Please add at least one course.");
            return;
        }

        let totalCreditHours = 0;
        let totalQualityPoints = 0;

        for (const course of courses) {
            totalCreditHours += course.creditHours;
            totalQualityPoints += calculateQualityPoints(course.grade) * course.creditHours;
        }

        const gpa = totalQualityPoints / totalCreditHours;
        resultDiv.textContent = `Your GPA is: ${gpa.toFixed(2)}`;
    });

    function calculateQualityPoints(grade) {
        switch (grade.toUpperCase()) {
            case "A": return 4.0;
            case "B": return 3.0;
            case "C": return 2.0;
            case "D": return 1.0;
            case "F": return 0.0;
            default: return 0.0;
        }
    }
});
