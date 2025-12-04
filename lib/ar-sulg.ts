export function ArSlug(text: string) {
  const map: Record<string, string> = {
    أ: 'a',
    ا: 'a',
    إ: 'i',
    آ: 'aa',
    ب: 'b',
    ت: 't',
    ث: 'th',
    ج: 'j',
    ح: 'h',
    خ: 'kh',
    د: 'd',
    ذ: 'dh',
    ر: 'r',
    ز: 'z',
    س: 's',
    ش: 'sh',
    ص: 's',
    ض: 'd',
    ط: 't',
    ظ: 'z',
    ع: 'aa',
    غ: 'gh',
    ف: 'f',
    ق: 'q',
    ك: 'k',
    ل: 'l',
    م: 'm',
    ن: 'n',
    ه: 'h',
    و: 'w',
    ي: 'y',
    ى: 'a',
    ة: 'h',
  };

  let result = text
    .split('')
    .map((char) => map[char] || char)
    .join('');

  result = result
    .replace(/[^a-zA-Z0-9]+/g, '-') // غير الحروف → -
    .replace(/--+/g, '-') // دمج الشرطات
    .replace(/^-+|-+$/g, '') // إزالة الشرطات من البداية والنهاية
    .toLowerCase();

  return result;
}
