import * as Geo from "./Geometrys/Geometrys";

export class WKTWriter {
    /**
     * Transforms the input Geometry object into WKT-formatted String. e.g.
     * <pre><code>
     * new WKTWriter().write(new LineString(new double[]{30, 10, 10, 30, 40, 40}));
     * //returns "LINESTRING (30 10, 10 30, 40 40)"
     * </code></pre>
     */
    write(input) {
      let output = [];
      let result = [];

      let upperName = input.constructor.name.toUpperCase();
      let values = [...input.values];

      switch(input.constructor.name){
        case 'Point':
          output.push(upperName + ' (' + values.join(' ') + ')');
          break;

        case 'LineString':

          for( let i=0; i<values.length -1; i+=2){
            result.push([`${values[i]} ${values[i+1]}`]);
          }

          output.push(upperName + ' (' + result.join(', ') + ')');
          break;

        case 'Polygon':

          values.forEach(v => {
            result.push(`(${v.join(', ')})`)
          });

          output.push(upperName + ' (' + result.join(', ') + ')')
          break;

        case 'MultiPoint':

          values.forEach(v => {
            result.push(`(${v.join(', ')})`)
          });

          output.push(upperName + ' (' + result.join(', ') + ')')
          break;
        
        case 'MultiLineString':

          values.forEach(v => {
            result.push(`(${v.join(' ')})`)
          });

          output.push(upperName + ' (' + result.join(', ') + ')')
          break;

        case 'MultiPolygon':

          let poly = JSON.stringify(values)
          .replace(' ', '')
          .replaceAll(',', ' ')
          .replaceAll('] [', '), (')
          .replaceAll('[', '(')
          .replaceAll(']', ')')

          output.push(upperName + ' ' + poly)
          break; 

        case 'GeometryCollection':
          let outputAcc = [];
          values[0].forEach(e => {
            let wrt = new WKTWriter();
            outputAcc.push(wrt.write(e))
          })

          output.push(upperName + ' (' + outputAcc.join(', ') + ')');
          break;
          
        default:
          
          throw new Error(`Geometry ${input.constructor.name} does not exist.`)
      }

    return output.join(', ');
    }
}