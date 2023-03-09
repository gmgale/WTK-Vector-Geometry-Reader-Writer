# WTK Vector Geometry Reader/Writer

## Helper classes to convert vector geometry objects to and from WKT.  
Read more about WKT [here](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry.).

The reader/writer classes can handle the most common geometry objects, including deeply nested geometry collection objects.

To run all tests:
```bash
npm i
npm run test
```

## Reader
The reader takes a WKT string and returns a class/object/GeometryCollection(of nested classes/objects).  
Example: 
```js
reader.read("POLYGON ((4, 6, 7, 10), (1, 2, 3, 7))");
reader.read("
  GEOMETRYCOLLECTION (POINT (4 6),
  LINESTRING (4 6, 7 10),
  MULTIPOLYGON (((4 6), (1 2)), (3 4)))");
```
Produces the classes/objects:

```js
Polygon { values: [ [ 4, 6, 7, 10 ], [ 1, 2, 3, 7 ] ] }
GeometryCollection {
     values: [ [ [Point], [LineString], [MultiPolygon] ] ]
 }

```

## Writer
The writer takes an instance of a Geometric class/object/GeometryCollection(of nested classes/objects) and returns a WKT formatted string.  
Example:
```js
writer.write(new Geo.MultiPoint([4, 6], [1, 2]));
writer.write(new Geo.GeometryCollection([
      new Geo.Point(),
      new Geo.LineString([3,4]),
      new Geo.MultiPolygon()
    ]));
```
Produces the WKT formatted strings:
```js
"MULTIPOINT ((4, 6), (1, 2))"
"GEOMETRYCOLLECTION (POINT EMPTY, LINESTRING (3 4), MULTIPOLYGON EMPTY)"
```

## Empty constructors
As seen in the above example, if the constructor for the Geometry class receives no arguments, 'EMPTY' will take it' place.
The ```isEmpty()``` method can be called on any instance of a Geometry to check its values. 
