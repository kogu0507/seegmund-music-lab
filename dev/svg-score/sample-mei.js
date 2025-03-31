// sample-mei.js
const text = `
<?xml version="1.0" encoding="UTF-8"?>
<?xml-model href="https://music-encoding.org/schema/4.0.0/mei-all.rng" type="application/xml" schematypens="http://relaxng.org/ns/structure/1.0"?>
<?xml-model href="https://music-encoding.org/schema/4.0.0/mei-all.rng" type="application/xml" schematypens="http://purl.oclc.org/dsdl/schematron"?>
<mei xmlns="http://www.music-encoding.org/ns/mei" meiversion="4.0.0">
  <meiHead>
    <fileDesc>
      <titleStmt>
        <title>Simple Melody in 8 Measures</title>
      </titleStmt>
      <pubStmt>
        <respStmt>
          <resp>Encoded by</resp>
          <persName>AI</persName>
        </respStmt>
      </pubStmt>
    </fileDesc>
    <encodingDesc>
      <appInfo>
        <application version="1.0">
          <name>MEI Editor</name>
        </application>
      </appInfo>
    </encodingDesc>
  </meiHead>
  <music>
    <body>
      <mdiv>
        <score>
          <scoreDef key.sig="0" meter.count="4" meter.unit="4">
            <staffGrp>
              <staffDef n="1" clef.shape="G" clef.line="2" lines="5"/>
            </staffGrp>
          </scoreDef>
          <section>
            <measure n="1">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n1" pname="f" oct="4" dur="4"/>
                  <note xml:id="n2" pname="e" oct="4" dur="4"/>
                  <note xml:id="n3" pname="d" oct="4" dur="4"/>
                  <note xml:id="n4" pname="c" oct="4" dur="4"/>
                </layer>
              </staff>
            </measure>
            <measure n="2">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n5" pname="g" oct="4" dur="2"/>
                  <note xml:id="n6" pname="g" oct="4" dur="4"/>
                  <note xml:id="n7" pname="a" oct="4" dur="4"/>
                </layer>
              </staff>
            </measure>
            <measure n="3">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n8" pname="b" oct="4" dur="2"/>
                  <note xml:id="n9" pname="a" oct="4" dur="4"/>
                  <note xml:id="n10" pname="g" oct="4" dur="4"/>
                </layer>
              </staff>
            </measure>
            <measure n="4">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n11" pname="f" oct="4" dur="2"/>
                  <note xml:id="n12" pname="e" oct="4" dur="4"/>
                  <note xml:id="n13" pname="d" oct="4" dur="4"/>
                </layer>
              </staff>
            </measure>
            <measure n="5">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n14" pname="c" oct="4" dur="1"/>
                </layer>
              </staff>
            </measure>
            <measure n="6">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n15" pname="c" oct="4" dur="4"/>
                  <note xml:id="n16" pname="d" oct="4" dur="4"/>
                  <note xml:id="n17" pname="e" oct="4" dur="4"/>
                  <note xml:id="n18" pname="f" oct="4" dur="4"/>
                </layer>
              </staff>
            </measure>
            <measure n="7">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n19" pname="g" oct="4" dur="2"/>
                  <note xml:id="n20" pname="g" oct="4" dur="4"/>
                  <note xml:id="n21" pname="a" oct="4" dur="4"/>
                </layer>
              </staff>
            </measure>
            <measure n="8" right="end">
              <staff n="1">
                <layer n="1">
                  <note xml:id="n22" pname="g" oct="4" dur="2"/>
                  <note xml:id="n23" pname="c" oct="4" dur="2"/>
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

export default text;
