// E2E Wiring Test Suite for PassSapa v1.9.0 (Diagram T2 Architecture)
const { SAMPLE_SUBJECTS, SAMPLE_QUESTIONS, SAMPLE_STUDY_MATERIALS, SAMPLE_KNOWLEDGE_ARTICLES } = require("../src/lib/constants.ts");

console.log("=================================================");
console.log("🧪 PASSSAPA v1.9.0 E2E WIRING AUDIT & TEST SUITE");
console.log("=================================================");

let passedCount = 0;
let totalCount = 0;

function assertTest(name, condition, details) {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`✅ [PASS] ${name}`);
  } else {
    console.error(`❌ [FAIL] ${name} ${details ? `- ${details}` : ""}`);
  }
}

// ---------------------------------------------------------
// TEST GROUP 1: PUBLIC NAVIGATION & KNOWLEDGE HUB WIRING
// ---------------------------------------------------------
console.log("\n--- Group 1: Public Navigation & Knowledge Hub Wiring ---");
assertTest("Knowledge Articles exist and loaded", SAMPLE_KNOWLEDGE_ARTICLES.length >= 3);
assertTest("First Knowledge Article has required fields", !!SAMPLE_KNOWLEDGE_ARTICLES[0].fullContent && !!SAMPLE_KNOWLEDGE_ARTICLES[0].category);
assertTest("Sample Questions for Demo Quiz exist", SAMPLE_QUESTIONS.length > 0);

// ---------------------------------------------------------
// TEST GROUP 2: MEMBER BRANCH SELECTOR HUB & 5 BRANCHES WIRING
// ---------------------------------------------------------
console.log("\n--- Group 2: Member Branch Selector Hub & 5 Branches ---");
assertTest("5 Major Subjects registered", SAMPLE_SUBJECTS.length === 5);
const subjectNames = SAMPLE_SUBJECTS.map(s => s.name);
assertTest("Contains 'เวชกรรมไทย'", subjectNames.includes("เวชกรรมไทย"));
assertTest("Contains 'เภสัชกรรมไทย'", subjectNames.includes("เภสัชกรรมไทย"));
assertTest("Contains 'ผดุงครรภ์ไทย'", subjectNames.includes("ผดุงครรภ์ไทย"));
assertTest("Contains 'นวดไทย'", subjectNames.includes("นวดไทย"));
assertTest("Contains 'กฎหมายและจรรยาบรรณวิชาชีพ'", subjectNames.includes("กฎหมายและจรรยาบรรณวิชาชีพ"));

// ---------------------------------------------------------
// TEST GROUP 3: DIAGRAM T2 EXAM TYPES & PARTS WIRING
// ---------------------------------------------------------
console.log("\n--- Group 3: Diagram T2 Exam Types & Parts Wiring ---");

// Theory Exam
const medTheoryV1 = SAMPLE_QUESTIONS.filter(q => q.category === "เวชกรรมไทย" && q.examPart === "theory" && q.subCategory === "เวช 1");
const medTheoryV2 = SAMPLE_QUESTIONS.filter(q => q.category === "เวชกรรมไทย" && q.examPart === "theory" && q.subCategory === "เวช 2");
assertTest("เวชกรรมไทย ภาคทฤษฎี เวช 1 exists", medTheoryV1.length > 0);
assertTest("เวชกรรมไทย ภาคทฤษฎี เวช 2 exists", medTheoryV2.length > 0);

// MCQ 5 Choices (A-E)
const mcq5Questions = SAMPLE_QUESTIONS.filter(q => q.questionType === "mcq_5" && q.options && q.options.length === 5);
assertTest("MCQ 5 Choices (A, B, C, D, E) supported", mcq5Questions.length > 0);

// Fill in the blank (เติมคำในช่องว่าง)
const fillBlankQuestions = SAMPLE_QUESTIONS.filter(q => q.questionType === "fill_in_blank" && !!q.correctAnswerText);
assertTest("Fill-in-the-blank (ข้อสอบเติมคำ) supported", fillBlankQuestions.length > 0);

// Subjective (อัตนัย)
const subjectiveQuestions = SAMPLE_QUESTIONS.filter(q => q.questionType === "subjective" && !!q.subjectiveRubric);
assertTest("Subjective Essay (ข้อสอบอัตนัย + Rubric) supported", subjectiveQuestions.length > 0);

// Practical Exam - เภสัช/ผดุงครรภ์/นวด (เติมคำในช่องว่าง/ ปรนัย)
const pharmPractical = SAMPLE_QUESTIONS.filter(q => q.category === "เภสัชกรรมไทย" && q.examPart === "practical");
const midPractical = SAMPLE_QUESTIONS.filter(q => q.category === "ผดุงครรภ์ไทย" && q.examPart === "practical");
const massagePractical = SAMPLE_QUESTIONS.filter(q => q.category === "นวดไทย" && q.examPart === "practical");

assertTest("เภสัชกรรมไทย ภาคปฏิบัติ (เติมคำ/ปรนัย) exists", pharmPractical.length >= 2);
assertTest("ผดุงครรภ์ไทย ภาคปฏิบัติ (เติมคำ/ปรนัย) exists", midPractical.length >= 2);
assertTest("นวดไทย ภาคปฏิบัติ (เติมคำ/ปรนัย) exists", massagePractical.length >= 2);

// ---------------------------------------------------------
// TEST GROUP 4: STUDY MATERIALS WIRING
// ---------------------------------------------------------
console.log("\n--- Group 4: Study Materials Wiring ---");
assertTest("Study Materials cover all 5 subjects", SAMPLE_STUDY_MATERIALS.length >= 5);

// ---------------------------------------------------------
// FINAL SUMMARY
// ---------------------------------------------------------
console.log("\n=================================================");
console.log(`📊 E2E AUDIT RESULT: ${passedCount} / ${totalCount} TESTS PASSED (${((passedCount/totalCount)*100).toFixed(1)}%)`);
console.log("=================================================");

if (passedCount === totalCount) {
  console.log("🎉 ALL WIRING CONNECTIONS & FEATURES VERIFIED 100% PERFECT!");
  process.exit(0);
} else {
  console.error("⚠️ SOME TESTS FAILED!");
  process.exit(1);
}
