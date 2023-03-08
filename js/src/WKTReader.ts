import * as Geo from './Geometrys/Geometrys';

export class WKTReader {
  /**
  * Transforms the input WKT-formatted String into Geometry object
  */
  read(input: string) {
    let output;
    let vals;
    let [name, ...values] = input.split(' ');

    const friendlyName = {
      POINT: "Point",
      LINESTRING: "LineString",
      POLYGON: "Polygon",
      MULTIPOINT: "MultiPoint",
      MULTILINESTRING: "MultiLineString",
      MULTIPOLYGON: "MultiPolygon",
      GEOMETRYCOLLECTION: "GeometryCollection"
    };
    name = friendlyName[name];

    function stripChars(str){
      let result = [];
      str.forEach(e => {
        let newStr = e.replaceAll('(', '')
                      .replaceAll(')', '')
                      .replaceAll(',', '');
        result.push(Number(newStr));
      });
      return result
    }

    switch(name){
      case 'Point':
        vals = stripChars(values);
        output = new Geo.Point(vals);

        break;

      case 'LineString':
        vals = stripChars(values);
        output = new Geo.LineString(vals);

        break;

      case 'Polygon':
        vals = values.join('').replaceAll('(', '[').replaceAll(')', ']');
        vals = JSON.parse(vals);
        output = new Geo.Polygon(...vals);
        
        break;

      case 'MultiPoint':
        vals = values.join('').replaceAll('(', '[').replaceAll(')', ']');
        vals = JSON.parse(vals);
        output = new Geo.MultiPoint(...vals);

        break;
      
      case 'MultiLineString':
        vals = values.map(e =>{
          return e.replaceAll(",", "");
        });
        vals = vals.join(',').replaceAll('(', '[').replaceAll(')', ']');
        vals = JSON.parse(vals);
        output = new Geo.MultiLineString(...vals);

        break;

      case 'MultiPolygon':
        vals = values.map(e =>{
          return e.replaceAll(",", "");
        });
        vals = vals.join(',').replaceAll('(', '[').replaceAll(')', ']');
        vals = JSON.parse(vals);
        output = new Geo.MultiPolygon(...vals);
        break;

      case 'GeometryCollection':
  
        vals = values.join(' ');
        let result = [];
        let start = 1;
        for(let i=0; i<vals.length; i++){
          // Here we check if i is space and i+1 is a letter (next geometry)
          if( vals[i] == ' ' && RegExp(/^\p{L}/,'u').test(vals[i+1])){
            result.push(vals.substring(start, i-1));
            start = i +1;
          }
        }

        result.push(vals.substring(start, vals.length -1));

        let objs = result.map(e =>{
          const reader = new WKTReader();
          return reader.read(e);
        });

        output = new Geo.GeometryCollection(objs);
        break;

      default:
        throw new Error('Invalid WTK string.');
    }

  return output;
  }

}