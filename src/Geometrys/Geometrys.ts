export class Geometry{
  values = [];

  constructor(values) {
    this.values = values;
    this.isEmpty();
    return this;
  }
  
  isEmpty(){
    if(this.values.length == 0){
      return true;
    } else {
      return false;
    }
  }
}

export class Point extends Geometry{
  constructor(...values){
    super(values);
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
