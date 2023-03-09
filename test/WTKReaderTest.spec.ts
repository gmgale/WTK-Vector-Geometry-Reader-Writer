import { WKTReader } from '../src/WKTReader';
import * as Geo from '../src/Geometrys/Geometrys';

describe("WKT Reader Test", () => {

  let reader;

  beforeEach(() => {
    reader = new (WKTReader);
  });

  it("Tests WKT-formatted String creates correct Point Geometry object", async () => {

      expect(reader.read('POINT (4 6)')).toMatchObject(new Geo.Point([4, 6]));
  })

  it("Tests WKT-formatted String creates correct Linestring Geometry object", async () => {

    expect(reader.read('LINESTRING (4 6, 7 10)')).toMatchObject(new Geo.LineString([4, 6, 7, 10]));
  })

  it("Tests WKT-formatted String creates correct Polygon Geometry object", async () => {

    expect(reader.read("POLYGON ((4, 6, 7, 10), (1, 2, 3, 7))")).toMatchObject(new Geo.Polygon([4, 6, 7, 10], [1, 2, 3, 7]));
  })

  it("Tests WKT-formatted String creates correct MultiPoint Geometry object", async () => {

    expect(reader.read("MULTIPOINT ((4, 6), (1, 2))")).toMatchObject(new Geo.MultiPoint([4, 6], [1, 2]));
  })

  it("Tests WKT-formatted String creates correct MultiLineString Geometry object", async () => {

    expect(reader.read("MULTILINESTRING ((4 6), (1 2), (3 4))")).toMatchObject(new Geo.MultiLineString([4, 6], [1, 2], [3, 4]));
  })

  it("Tests WKT-formatted String creates correct MultiPolygon Geometry object", async () => {

    expect(reader.read("MULTIPOLYGON (((4 6), (1 2)), (3 4))")).toMatchObject(new Geo.MultiPolygon([[4, 6], [1, 2]], [3, 4]));
  })

  it("Tests WKT-formatted String creates correct Point Geometry object", async () => {

    expect(reader.read("GEOMETRYCOLLECTION (POINT (4 6), LINESTRING (4 6, 7 10), MULTIPOLYGON (((4 6), (1 2)), (3 4)))"))
    .toMatchObject(new Geo.GeometryCollection([
      new Geo.Point([4, 6]),
      new Geo.LineString([4, 6, 7, 10]),
      new Geo.MultiPolygon([[4, 6], [1, 2]], [3, 4])
    ])
    );
  })
});