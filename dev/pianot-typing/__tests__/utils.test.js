// utils.test.js

// インポート
// __tests__からアクセスする場合は［../］
import {
    getElement,
    getElements,
    getElementsByIds,
    getElementsBySelectors,
    getElementValue,
    getElementData,
    getCheckedRadioValue,
    toggleElementVisibility
} from '../utils.mjs';

// getElement のテスト
describe('getElement', () => {
    // テスト用の HTML をセットアップ
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="test-element"></div>
            <div class="test-class"></div>
        `;
    });

    it('ID で要素を取得できる', () => {
        const element = getElement('#test-element');
        expect(element).toBeInstanceOf(HTMLElement);
        expect(element.id).toBe('test-element');
    });

    it('クラス名で要素を取得できる', () => {
        const element = getElement('.test-class');
        expect(element).toBeInstanceOf(HTMLElement);
        expect(element.classList.contains('test-class')).toBe(true);
    });

    it('存在しない要素を指定した場合、null を返す', () => {
        const element = getElement('#non-existent-element');
        expect(element).toBeNull();
    });
});

// getElements のテスト
describe('getElements', () => {
    // テスト用の HTML をセットアップ
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="test-class"></div>
            <div class="test-class"></div>
            <div class="another-class"></div>
        `;
    });

    it('クラス名で複数の要素を取得できる', () => {
        const elements = getElements('.test-class');
        expect(elements).toHaveLength(2);
        elements.forEach(element => {
            expect(element).toBeInstanceOf(HTMLElement);
            expect(element.classList.contains('test-class')).toBe(true);
        });
    });

    it('存在しないクラス名を指定した場合、空の配列を返す', () => {
        const elements = getElements('.non-existent-class');
        expect(elements).toHaveLength(0);
    });
});


// getElementValue のテスト
describe('getElementValue', () => {
    beforeEach(() => {
        document.body.innerHTML = '<input type="text" id="test-input" value="test">';
    });
    it('入力要素の値を取得できる', () => {
        expect(getElementValue('#test-input')).toBe('test');
    });
    it('存在しない要素を指定した場合、nullを返す', () => {
        expect(getElementValue('#non-existent-input')).toBeNull();
    });
    it('値が設定されていない要素を指定した場合、空文字列を返す', () => {
        document.body.innerHTML = '<input type="text" id="test-input">';
        expect(getElementValue('#test-input')).toBe('');
    });
});
// getElementData のテスト
describe('getElementData', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="test-div" data-test="test-value"></div>';
    });
    it('data-属性の値を取得できる', () => {
        expect(getElementData('#test-div', 'test')).toBe('test-value');
    });
    it('存在しない要素を指定した場合、nullを返す', () => {
        expect(getElementData('#non-existent-div', 'test')).toBeNull();
    });
    it('存在しないdata-属性を指定した場合、nullを返す', () => {
        expect(getElementData('#test-div', 'non-existent-key')).toBeNull();
    });
});

// getCheckedRadioValue のテスト
describe('getCheckedRadioValue', () => {
    it('チェックされているラジオボタンの値を取得できる', () => {
        document.body.innerHTML = '<input type="radio" name="test-radio" value="value1" checked><input type="radio" name="test-radio" value="value2">';
        expect(getCheckedRadioValue('test-radio')).toBe('value1');
    });
    it('チェックされていないラジオボタンの場合、nullを返す', () => {
        document.body.innerHTML = '<input type="radio" name="test-radio" value="value1"><input type="radio" name="test-radio" value="value2">';
        expect(getCheckedRadioValue('test-radio')).toBeNull();
    });
    it('存在しないラジオボタンの場合、nullを返す', () => {
        expect(getCheckedRadioValue('non-existent-radio')).toBeNull();
    });
});

// toggleElementVisibility のテスト
describe('toggleElementVisibility', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="test-div" class="d-none"></div>';
    });
    it('要素を表示できる', () => {
        toggleElementVisibility({ show: '#test-div' });
        expect(document.getElementById('test-div').classList.contains('d-none')).toBe(false);
    });
    it('要素を非表示にできる', () => {
        toggleElementVisibility({ hide: '#test-div' });
        expect(document.getElementById('test-div').classList.contains('d-none')).toBe(true);
    });
    it('複数の要素を操作できる', () => {
        document.body.innerHTML += '<div id="test-div2" class="d-none"></div>';
        toggleElementVisibility({ show: ['#test-div', '#test-div2'] });
        expect(document.getElementById('test-div').classList.contains('d-none')).toBe(false);
        expect(document.getElementById('test-div2').classList.contains('d-none')).toBe(false);
    });
    it('存在しない要素を指定してもエラーにならない', () => {
        toggleElementVisibility({ show: '#non-existent-div' }); // エラーにならないことを確認
    });
});


// getElementsByIds のテスト
describe('getElementsByIds', () => {
    // テスト用の HTML をセットアップ
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="element-1"></div>
            <div id="element-2"></div>
            <div id="element-3"></div>
        `;
    });

    it('ID の配列で複数の要素を取得できる', () => {
        const elements = getElementsByIds(['element-1', 'element-2']);
        expect(elements).toEqual({
            'element-1': expect.any(HTMLElement),
            'element-2': expect.any(HTMLElement),
        });
    });

    it('存在しない ID を指定した場合、null を返す', () => {
        const elements = getElementsByIds(['element-1', 'non-existent-element']);
        expect(elements).toEqual({
            'element-1': expect.any(HTMLElement),
            'non-existent-element': null,
        });
    });
});

// getElementsBySelectors のテスト
describe('getElementsBySelectors', () => {
    // テスト用の HTML をセットアップ
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="test-class-1"></div>
            <div class="test-class-2"></div>
            <div class="test-class-3"></div>
        `;
    });

    it('セレクタのオブジェクトで複数の要素を取得できる', () => {
        const elements = getElementsBySelectors({
            'element1': '.test-class-1',
            'element2': '.test-class-2',
        });
        expect(elements).toEqual({
            'element1': expect.any(NodeList), 
            'element2': expect.any(NodeList), 
        });
    });

    it('存在しないセレクタを指定した場合、空のNodeListを返す', () => { 
        const elements = getElementsBySelectors({
            'element1': '.test-class-1',
            'nonExistentElement': '.non-existent-class',
        });
        expect(elements).toEqual({
            'element1': expect.any(NodeList), 
            'nonExistentElement': expect.any(NodeList), 
        });
    });
});




// utils.test.js
// ... (既存のテストケース) ...

// ============================================================================
// 次回作業：utils.mjs のテストケース追加
// ============================================================================

/*
  以下の関数のテストケースを追加する必要があります。

  *  `getElement` 関数:
      * エラーハンドリングのテストを追加する (不正なセレクタを渡した場合など)。
      * 複数の要素が存在する場合の挙動を確認するテストを追加する。
      * 特殊文字を含むセレクタのテストを追加する。

  *  `getElements` 関数:
      * エラーハンドリングのテストを追加する (不正なセレクタを渡した場合など)。
      * 特殊文字を含むセレクタのテストを追加する。
      * 非常に多くの要素が存在する場合のパフォーマンスを検証するテストを追加する。

  *  `getElementValue` 関数:
      * 様々な入力タイプ（テキスト、数値、日付など）の要素に対するテストを追加する。
      * 空白文字を含む値のテストを追加する。
      * 特殊文字を含む値のテストを追加する。

  *  `getElementData` 関数:
      * 複数のdata属性を持つ要素のテストを追加する。
      * data属性の値が空文字列の場合のテストを追加する。
      * data属性の値が数値やブール値の場合のテストを追加する。

  *  `getCheckedRadioValue` 関数:
      * 複数のラジオボタングループが存在する場合のテストを追加する。
      * チェックされていないラジオボタンが複数存在する場合のテストを追加する。

  *  `toggleElementVisibility` 関数:
      * class名以外の方法で表示/非表示を切り替える要素に対するテストを追加する。
      * 既に表示/非表示状態になっている要素に対するテストを追加する。
      * 複数の要素に対して同時に操作する場合のテストを追加する。
      * エラーハンドリングのテストを追加する（存在しない要素を指定した場合など）。

  *  `getElementsByIds` 関数:
      * IDが重複している場合の挙動を確認するテストを追加する。
      * 空の配列を渡した場合のテストを追加する。

  *  `getElementsBySelectors` 関数:
      * 複雑なセレクタ（組み合わせセレクタなど）のテストを追加する。
      * エラーハンドリングのテストを追加する（不正なセレクタを渡した場合など）。


  各テストケースは、正しく動作するケースだけでなく、エラー処理や境界条件を考慮したケースも網羅するように設計する必要があります。
*/
