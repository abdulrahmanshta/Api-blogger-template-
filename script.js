
// مفاتيح API
const OPENAI_API_KEY = "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";
const BLOGGER_API_KEY = "AIzaSyCwv3-NsvuDMTvZdlySfmbd__QnZuf-DZI";
const BLOG_ID = "معرف المدونة الخاص بك";

// عناصر HTML
const generateButton = document.getElementById("generate");
const publishButton = document.getElementById("publish");
const promptInput = document.getElementById("prompt");
const titleInput = document.getElementById("title");
const editor = document.getElementById("editor");

// إنشاء المقال باستخدام OpenAI
generateButton.addEventListener("click", async () => {
  const prompt = promptInput.value;
  if (!prompt) {
    alert("يرجى إدخال فكرة المقال");
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    editor.innerHTML = data.choices[0].text.trim();
  } catch (error) {
    alert("خطأ أثناء إنشاء المقال: " + error.message);
  }
});

// نشر المقال على Blogger
publishButton.addEventListener("click", async () => {
  const title = titleInput.value;
  const content = editor.innerHTML;

  if (!title || !content) {
    alert("يرجى إدخال العنوان والمحتوى");
    return;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BLOGGER_API_KEY}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      }
    );

    if (response.ok) {
      alert("تم نشر المقال بنجاح!");
    } else {
      throw new Error("خطأ أثناء نشر المقال");
    }
  } catch (error) {
    alert(error.message);
  }
});
