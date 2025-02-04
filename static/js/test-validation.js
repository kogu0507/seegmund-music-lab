import {
    isRequired, isOfType, isMin, isMax, matchPattern,
    hasMinLength, isArray, isBoolean, isDate, validateSchema
} from './validation.js';

// ✅ 各バリデーション関数のテスト
console.log("🔍 isRequired (空文字):", isRequired("")); // true
console.log("🔍 isRequired (null):", isRequired(null)); // true
console.log("🔍 isRequired ('text'):", isRequired("text")); // false

console.log("🔍 isOfType (42, 'number'):", isOfType(42, 'number')); // true
console.log("🔍 isOfType ([], 'array'):", isOfType([], 'array')); // true
console.log("🔍 isOfType ('hello', 'string'):", isOfType("hello", "string")); // true
console.log("🔍 isOfType (null, 'object'):", isOfType(null, "object")); // false

console.log("🔍 isMin (5, 10):", isMin(5, 10)); // true
console.log("🔍 isMin (15, 10):", isMin(15, 10)); // false

console.log("🔍 isMax (50, 100):", isMax(50, 100)); // false
console.log("🔍 isMax (150, 100):", isMax(150, 100)); // true

console.log("🔍 matchPattern ('abc123', /^[a-z]+$/):", matchPattern("abc123", /^[a-z]+$/)); // true
console.log("🔍 matchPattern ('abc', /^[a-z]+$/):", matchPattern("abc", /^[a-z]+$/)); // false

console.log("🔍 hasMinLength ('abc', 5):", hasMinLength("abc", 5)); // true
console.log("🔍 hasMinLength ('abcdef', 5):", hasMinLength("abcdef", 5)); // false

console.log("🔍 isArray ([1, 2, 3]):", isArray([1, 2, 3])); // true
console.log("🔍 isArray ('not an array'):", isArray("not an array")); // false

console.log("🔍 isBoolean (true):", isBoolean(true)); // true
console.log("🔍 isBoolean ('true'):", isBoolean("true")); // false

console.log("🔍 isDate (new Date()):", isDate(new Date())); // true
console.log("🔍 isDate ('2024-02-02'):", isDate("2024-02-02")); // false
console.log("🔍 isDate (null):", isDate(null)); // false

// ✅ スキーマバリデーションのテスト
const schema = {
    name: { type: 'string', required: true, minLength: 3 },
    age: { type: 'number', min: 0, max: 150 },
    email: { type: 'string', required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ },
    password: { type: 'string', required: true, minLength: 8 },
    confirmPassword: {
        type: 'string',
        required: true,
        conditional: {
            field: 'password',
            validator: (value, data) => value === data.password,
            message: 'Passwords do not match.'
        }
    }
};

// ✅ 正しいデータ
const validData = { name: 'John', age: 30, email: 'john@example.com', password: 'secret123', confirmPassword: 'secret123' };
console.log("✅ validateSchema (valid data):", validateSchema(validData, schema));

// ❌ 無効なデータ
const invalidData = { name: '', age: -5, email: 'invalid-email', password: 'secret123', confirmPassword: 'wrong' };
console.log("❌ validateSchema (invalid data):", validateSchema(invalidData, schema));
