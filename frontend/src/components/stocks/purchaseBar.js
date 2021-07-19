import React from "react"
import CardLight from "../CardLight"
import Card from "../Card"
import NumberFormat from "react-number-format"
import Button from "../Button"

function PurchaseBar() {
    return (
        <div className="flex flex-col w-full h-full">
            <p className="text-white font-semibold m-5">Market</p>
            <CardLight height="auto" width="full">
                <p className="font-semibold mb-3">Bitcoin</p>
                <div className="flex justify-between">
                    {/* Current Position */}
                    <Card width="1/6" height="full">
                        <p className="flex h-full items-center justify-between">
                            <span className="font-medium text-custom-color-lightgrey">Position:</span>
                            <span className="font-semibold">0</span>
                        </p>
                    </Card>

                    {/* Quantity Shortcuts */}
                    <Card width="3/5" height="full">
                        <div className="flex h-full items-center gap-x-2">
                            <p className="font-medium text-custom-color-lightgrey mr-3">Cash:</p>
                            <CardLight width="full" height="8">
                                <div className="flex h-full w-full items-center justify-center">
                                    <p>1/4</p>
                                </div>
                            </CardLight>
                            <CardLight width="full" height="8">
                                <div className="flex h-full w-full items-center justify-center">
                                    <p>1/3</p>
                                </div>
                            </CardLight>
                            <CardLight width="full" height="8">
                                <div className="flex h-full w-full items-center justify-center">
                                    <p>1/2</p>
                                </div>
                            </CardLight>
                            <CardLight width="full" height="8">
                                <div className="flex h-full w-full items-center justify-center">
                                    <p>FULL</p>
                                </div>
                            </CardLight>
                        </div>
                    </Card>

                    {/* Quantity */}
                    <Card width="1/5" height="full">
                        <div className="flex items-center w-full h-full">
                            <p className="font-medium text-custom-color-lightgrey mr-3">Qty</p>
                            <p className="flex w-full justify-between items-center">
                                <span className="flex items-center justify-center bg-custom-card-light border border-custom-color-grey h-8 w-8">-</span>
                                <span>2</span>
                                <span className="flex items-center justify-center bg-custom-card-light border border-custom-color-grey h-8 w-8">+</span>
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Total amount */}
                <div className="flex w-full items-center mt-5 gap-x-3">
                    <hr className="border-custom-color-grey w-full" />
                    <p className="text-lg font-semibold whitespace-nowrap">Total: <NumberFormat value={"500000"} displayType={"text"} thousandSeparator={true} prefix={"$"} /></p>
                </div>

                <div className="flex self-end mt-3 gap-x-3">
                    <Button width="28" height="8" background={true} text="Buy" />
                    <Button width="28" height="8" background={false} text="Sell" />
                </div>
            </CardLight>
        </div>
    )
}

export default PurchaseBar