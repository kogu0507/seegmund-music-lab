// test-1bar.js
// このファイルはMEI形式の楽譜データをエクスポートしています。
// Verovioでシステムブレーク（改行）を実現するため、
// 5小節目のレイヤー先頭に <sb/> タグを追加しています。

const meiData = `
<?xml version="1.0" encoding="UTF-8"?>
<!-- MEIスキーマの定義 -->
<?xml-model href="https://music-encoding.org/schema/4.0.0/mei-all.rng" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"?>
<?xml-model href="https://music-encoding.org/schema/4.0.0/mei-all.rng" type="application/xml" schematypens="http://purl.oclc.org/dsdl/schematron"?>
<mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="4.0.0">
  <music>
    <body>
      <mdiv>
        <score>
          <!-- 楽譜定義（scoreDef）: スタッフグループとスタッフの設定 -->
          <scoreDef>
            <staffGrp>
              <!-- 1スタッフ、5線、ト音記号(G clef)を定義 -->
              <staffDef n="1" lines="5" clef.shape="G" clef.line="2"/>
            </staffGrp>
          </scoreDef>
          <section>
            <!-- 1小節目 -->
            <measure n="1" xml:id="m1">
              <staff n="1">
                <layer n="1">
                  <!-- 各ノートの定義 -->
                  <note xml:id="n1" pname="c" oct="4" dur="4"/>
                  <note xml:id="n2" pname="d" oct="4" dur="4"/>
                  <note xml:id="n3" pname="e" oct="4" dur="4"/>
                  <note xml:id="n4" pname="f" oct="4" dur="4"/>
                </layer>
              </staff>
            </measure>
            <!-- 2小節目 -->
            <measure n="2" xml:id="m2">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n5" pname="g" oct="4" dur="4"/>
                  <note xml:id="n6" pname="a" oct="4" dur="4"/>
                  <note xml:id="n7" pname="b" oct="4" dur="4"/>
                  <note xml:id="n8" pname="c" oct="5" dur="4"/>
                </layer>
              </staff>
            </measure>
            <!-- 3小節目 -->
            <measure n="3" xml:id="m3">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n9" pname="d" oct="5" dur="4"/>
                  <note xml:id="n10" pname="e" oct="5" dur="4"/>
                  <note xml:id="n11" pname="f" oct="5" dur="4"/>
                  <note xml:id="n12" pname="g" oct="5" dur="4"/>
                </layer>
              </staff>
            </measure>
            <!-- 4小節目 -->
            <measure n="4" xml:id="m4">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n13" pname="a" oct="5" dur="4"/>
                  <note xml:id="n14" pname="b" oct="5" dur="4"/>
                  <note xml:id="n15" pname="c" oct="6" dur="4"/>
                  <note xml:id="n16" pname="d" oct="6" dur="4"/>
                </layer>
              </staff>
            </measure>
            <!-- 5小節目：ここでシステムブレークを入れるために、レイヤーの先頭に <sb/> を追加 -->
            <measure n="5" xml:id="m5">
              <staff n="1">
                <layer n="1">
                  <sb/> <!-- これにより、改行（新システム）が開始されます -->
                  <note xml:id="n17" pname="e" oct="6" dur="4"/>
                  <note xml:id="n18" pname="f" oct="6" dur="4"/>
                  <note xml:id="n19" pname="g" oct="6" dur="4"/>
                  <note xml:id="n20" pname="a" oct="6" dur="4"/>
                </layer>
              </staff>
            </measure>
            <!-- 6小節目 -->
            <measure n="6" xml:id="m6">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n21" pname="b" oct="6" dur="4"/>
                  <note xml:id="n22" pname="c" oct="7" dur="4"/>
                  <note xml:id="n23" pname="d" oct="7" dur="4"/>
                  <note xml:id="n24" pname="e" oct="7" dur="4"/>
                </layer>
              </staff>
            </measure>
            <!-- 7小節目 -->
            <measure n="7" xml:id="m7">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n25" pname="f" oct="7" dur="4"/>
                  <note xml:id="n26" pname="g" oct="7" dur="4"/>
                  <note xml:id="n27" pname="a" oct="7" dur="4"/>
                  <note xml:id="n28" pname="b" oct="7" dur="4"/>
                </layer>
              </staff>
            </measure>
            <!-- 8小節目 -->
            <measure n="8" xml:id="m8">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n29" pname="c" oct="8" dur="4"/>
                  <note xml:id="n30" pname="d" oct="8" dur="4"/>
                  <note xml:id="n31" pname="e" oct="8" dur="4"/>
                  <note xml:id="n32" pname="f" oct="8" dur="4"/>
                </layer>
              </staff>
            </measure>
          </section>
        </score>
      </mdiv>
    </body>
  </music>
</mei>

`;
export default meiData;
