<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $courses = json_decode(file_get_contents("php://input"), true);

    if (empty($courses)) {
        http_response_code(400);
        echo json_encode(["error" => "No courses provided"]);
        exit;
    }

    $totalCreditHours = 0;
    $totalQualityPoints = 0;

    foreach ($courses as $course) {
        $creditHours = floatval($course["creditHours"]);
        $grade = strtoupper($course["grade"]);

        if (empty($course["courseName"]) || empty($grade) || $creditHours <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "Invalid course data"]);
            exit;
        }

        $totalCreditHours += $creditHours;
        $totalQualityPoints += calculateQualityPoints($grade) * $creditHours;
    }

    $gpa = $totalQualityPoints / $totalCreditHours;

    echo json_encode(["gpa" => number_format($gpa, 2)]);
    exit;
}

function calculateQualityPoints($grade)
{
    switch ($grade) {
        case "A":
            return 4.0;
        case "B":
            return 3.0;
        case "C":
            return 2.0;
        case "D":
            return 1.0;
        case "F":
            return 0.0;
        default:
            return 0.0;
    }
}
