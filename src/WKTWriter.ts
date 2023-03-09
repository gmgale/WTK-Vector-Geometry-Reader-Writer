export class WKTWriter {
    /**
     * Transforms the input Geometry object into WKT-formatted String. e.g.
     **
     */
    write(input) {
      let output = [];
      let result = [];

      let upperName = input.constructor.name.toUpperCase();
      let values = [...input.values];

      if(input.isEmpty()){
        output.push(upperName + ' EMPTY');
        return output;
      }

      switch(input.constructor.name){
        case 'Point':
            output.push(upperName + ' (' + values[0].join(' ') + ')');
          break;

        case 'LineString':

          for( let i=0; i<values[0].length -1; i+=2){
            result.push([`${values[0][i]} ${values[0][i+1]}`]);
          }

          output.push(upperName + ' (' + result.join(', ') + ')');
          break;

        case 'Polygon':

          values.forEach(v => {
            result.push(`(${v.join(', ')})`);
          });

          output.push(upperName + ' (' + result.join(', ') + ')');
          break;

        case 'MultiPoint':

          values.forEach(v => {
            result.push(`(${v.join(', ')})`);
          });

          output.push(upperName + ' (' + result.join(', ') + ')');
          break;
        
        case 'MultiLineString':

          values.forEach(v => {
            result.push(`(${v.join(' ')})`);
          });

          output.push(upperName + ' (' + result.join(', ') + ')');
          break;

        case 'MultiPolygon':

          let poly = JSON.stringify(values)
          .replace(' ', '')
          .replaceAll(',', ' ')
          .replaceAll('] [', '), (')
          .replaceAll('[', '(')
          .replaceAll(']', ')');

          output.push(upperName + ' ' + poly);
          break; 

        case 'GeometryCollection':

          let outputAcc = [];
          values[0].forEach(e => {
            let wrt = new WKTWriter();
            outputAcc.push(wrt.write(e));
          })

          output.push(upperName + ' (' + outputAcc.join(', ') + ')');
          break;
          
        default:
          throw new Error(`Geometry ${input.constructor.name} does not exist.`);
      }

    return output.join(', ');
    }
}