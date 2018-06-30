@extends('layout.app')

@section('content')

    <h1>Dividend Calculator</h1>

    <form method="post" name="frm" id="frm">

        {{ csrf_field() }}

        <div class="form-group">

            <label for="totalTax">Monthly Total Tax Allowance</label>
            <input type="number" type="number" step="0.01" class="form-control col-3" id="totalTax" aria-describedby="totalTax" placeholder="Total Tax" value="1000" min="0">
            <small class="form-text text-muted">
                This is the total tax allowance for the month.
            </small>

        </div>

        <div class="form-group">

            <label for="totalPaid">Total Amount Paid</label>
            <input type="number" type="number" step="0.01" class="form-control col-3"  aria-describedby="totalPaid" placeholder="Total Paid" value="0" disabled id="totalPaid">
            <small class="form-text text-muted">Total payments made within period</small>

        </div>

        <div class="form-group mb-3">

            <button class="btn btn-outline-success mr-2 mb-1" type="button" data-toggle="tooltip" title="Add a payment line." id="add_payment">Add Payment</button>

            <button class="btn btn-outline-danger mr-2 mb-1" type="button" data-toggle="tooltip" title="Remove a new payment line." id="remove_payment" disabled>Remove Payment</button>

            <button class="btn btn-outline-primary mb-1" type="submit" data-toggle="tooltip" title="Reload the page.">Reset</button>

        </div>

        <table class="table">

            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Payment Amount</th>
                    <th scope="col">Dividend</th>
                    <th scope="col">PAYE</th>
                </tr>
            </thead>

            <tbody>
                <tr data-row="0">
                    <th scope="row" class="counter">1</th>
                    <td>
                        <input type="number" name="payment_amount[0]" step="0.01" class="payment-amount form-control mr-2" aria-describedby="" placeholder="Payment Amount">
                    </td>
                    <td>
                        <input type="number" name="dividend_amount[0]" step="0.01" class="dividend-amount form-control mr-2" aria-describedby="" placeholder="Dividend Amount" value="0" disabled>
                    </td>
                    <td>
                        <input type="number" name="paye_amount[0]" step="0.01" class="paye-amount form-control mr-2" aria-describedby="" value="1000" placeholder="PAYE Amount" disabled>
                    </td>
                </tr>
            </tbody>

        </table>

    </form>


@endsection