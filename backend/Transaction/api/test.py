class Test:
    a = 20


    def __str__(self, query=False) -> str:
        if query:
            return "Jackie"
        return "Jack"

    def __repr__(self) -> str:
        return "Jackie"