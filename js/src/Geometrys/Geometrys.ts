export class Geometry{
  values: any;
  constructor(values) {
    this.values = values;
    return this;
  }
  
  isEmpty(){
    //TODO: Return true if empty
  }
}

export class Point extends Geometry{
  constructor(x, y){
    super([x, y]);
    return this;
  }
}

export class LineString extends Geometry{
  constructor(...values){
    super(values);
    return this;
  }
}

export class Polygon extends Geometry{
  constructor(...values){
    super(values);
    return this;
  }
}

export class MultiPoint extends Geometry{
  constructor(...values){
    super(values);
    return this;
  }
}

export class MultiLineString extends Geometry{
  constructor(...values){
    super(values);
    return this;
  }
}

export class MultiPolygon extends Geometry{
  constructor(...values){
    super(values);
    return this;
  }
}

export class GeometryCollection extends Geometry{
  constructor(...values){
    super(values);
    return this;
  }
}
