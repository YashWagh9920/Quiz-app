import React from 'react';
import DOMPurify from 'dompurify';
import { BookOpen, ArrowLeft, CheckCircle, BookOpenCheck } from 'lucide-react';


function StudyScreen({ studyData, updateState }) {
  // Safely render HTML content
  const createMarkup = (htmlContent) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  const sanitizeText = (text) => {
    if (!text) return "";
  
    // Normalize inconsistent prime symbols and spacing
    let cleanedText = text
      .replace(/\r?\n|\r/g, "") // Remove raw line breaks
      .replace(/\s{2,}/g, " ") // Collapse multiple spaces
      .replace(/5\s*′/g, "5'") // Fix prime symbol for 5'
      .replace(/3\s*′/g, "3'") // Fix prime symbol for 3'
      .replace(/[𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝐌𝐵𝐹𝐻𝐽𝑇𝑈]/g, (match) =>
        match.normalize("NFKD")
      ) // Replace bold/italic Unicode characters with normal letters
      .replace(/[\u200B-\u200D\uFEFF]/g, ""); // Remove zero-width spaces and invisible characters
  
    // Format markdown-style text (bold and italic)
    cleanedText = cleanedText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    cleanedText = cleanedText.replace(/\*(.*?)\*/g, "<em>$1</em>");
  
    // Add proper line breaks
    cleanedText = cleanedText.replace(/<br\s*\/?>/g, "\n");
  
    return cleanedText.trim();
  };
  


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
    {/* Header Section */}
    <div className="max-w-7xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
        <div className="flex items-center gap-3">
          <BookOpenCheck className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold text-gray-200">Study Materials</h1>
        </div>
        <button
          onClick={() => updateState("start")}
          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
        >
          Start Quiz
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>
    </div>

    {/* Study Content */}
    <div className="max-w-7xl mx-auto space-y-8">
      {studyData.map((question, questionIndex) => (
        <div 
          key={question.id || questionIndex} 
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden"
        >
          {/* Question Header */}
          <div className="bg-gray-700/50 p-6 border-b border-gray-600">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-blue-400">
                Question {questionIndex + 1}
              </h2>
            </div>
            <p className="text-gray-300">{question.topic}</p>
          </div>

          {/* Study Material Section */}
          <div className="p-6 space-y-6">
            {/* Reading Material */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                <BookOpenCheck className="w-5 h-5 text-green-400" />
                Study Material
              </h3>
              <div className="prose prose-invert max-w-none bg-gray-700/30 p-6 rounded-xl">
                <div
                  dangerouslySetInnerHTML={createMarkup(question.reading_material.content_sections[0])}
                  className="text-gray-300"
                />
              </div>
            </section>

            {/* Solution Section */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Detailed Solution
              </h3>
              <div className="bg-gray-700/30 p-6 rounded-xl space-y-4">
                {/* Original Question */}
                <div className="mb-4">
                  <h4 className="text-blue-400 font-semibold mb-2">Original Question:</h4>
                  <p className="text-gray-300">{sanitizeText(question.description)}</p>
                </div>

                {/* Step by Step Solution */}
                <div>
                  <h4 className="text-blue-400 font-semibold mb-2">Step-by-Step Explanation:</h4>
                  <div
                    className="text-gray-300"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeText(
                        question.detailed_solution?.replace(/\r\n/g, "<br />") || ""
                      ),
                    }}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default StudyScreen;