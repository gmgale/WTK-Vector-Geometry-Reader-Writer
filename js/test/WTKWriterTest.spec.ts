import { WKTWriter } from "../src/WKTWriter";
import * as Geo from "../src/Geometrys/Geometrys";

describe("WKT Writer Test", () => {

  let writer;

  beforeEach(() => {
    writer = new (WKTWriter);
  });

  it("Tests Geometry POINT object into WKT-formatted String", async () => {

      expect(writer.write(new Geo.Point(4, 6))).toBe("POINT (4 6)");
  })

  it("Tests Geometry LineString object into WKT-formatted String", async () => {

    expect(writer.write(new Geo.LineString(4, 6, 7, 10))).toBe("LINESTRING (4 6, 7 10)");
  })

  it("Tests Geometry Polygon object into WKT-formatted String", async () => {

    expect(writer.write(new Geo.Polygon([4, 6, 7, 10], [1, 2, 3, 7]))).toBe("POLYGON ((4, 6, 7, 10), (1, 2, 3, 7))");
  })

  it("Tests Geometry MultiPoint object into WKT-formatted String", async () => {

    expect(writer.write(new Geo.MultiPoint([4, 6], [1, 2]))).toBe("MULTIPOINT ((4, 6), (1, 2))");
  })

  it("Tests Geometry MultiLineString object into WKT-formatted String", async () => {

    expect(writer.write(new Geo.MultiLineString([4, 6], [1, 2], [3, 4]))).toBe("MULTILINESTRING ((4 6), (1 2), (3 4))");
  })

  it("Tests Geometry MultiPolygon object into WKT-formatted String", async () => {

    expect(writer.write(new Geo.MultiPolygon([[4, 6], [1, 2]], [3, 4]))).toBe("MULTIPOLYGON (((4 6), (1 2)), (3 4))");
  })

  it("Tests Geometry GeometryCollection object into WKT-formatted String", async () => {

    expect(writer.write(new Geo.GeometryCollection([
      new Geo.Point(4, 6),
      new Geo.LineString(4, 6, 7, 10),
      new Geo.MultiPolygon([[4, 6], [1, 2]], [3, 4])
    ])))
    .toBe("GEOMETRYCOLLECTION (POINT (4 6), LINESTRING (4 6, 7 10), MULTIPOLYGON (((4 6), (1 2)), (3 4)))"
      );
  })
});