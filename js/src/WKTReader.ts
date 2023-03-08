export class WKTReader {
/**
* Transforms the input WKT-formatted String into Geometry object
*/
static Geometry(input: string) {
  let output;

  function capitalizeFirstLetter(str) {
    return str.toLowerCase().str.charAt(0).toUpperCase() + str.slice(1);
  }

  input.split(' ').forEach(e => {

    let name = capitalizeFirstLetter(input[0]);
    let output = [];

    switch(name){
      case 'Point':
        break;

      case 'LineString':

        break;

      case 'Polygon':

        break;

      case 'MultiPoint':

        break;
      
      case 'MultiLineString':

        break;

      case 'MultiPolygon':

      default:
        throw new Error('Invalid WTK string.');
    }

  });

  return output.join('ASDF ');
}
}