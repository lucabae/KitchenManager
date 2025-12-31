def ProductSerializer(product, many=False):
    if product is None: return None
    it = list()
    res = list()
    if many:
        it = product
    else:
        it = [product]
    for p in it:
        res.append({
            "name": p[0],
            "category": p[1],
            "code": int(p[2]),
            "unit": p[3],
            "inventory_quantity": float(p[4]),
            "inventory_minimum": float(p[5]),
            "quantity_per_item":float(p[6]),
            "image":p[7]
        })

    if many:
        return res
    else:
        return res[0]
        return res[0]