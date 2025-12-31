from functions.getProduct import getProduct


def productIsSaved(code) -> bool:
    return getProduct(code) != None