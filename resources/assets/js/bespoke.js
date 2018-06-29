var myTimer;

/**
 * run when a payment input is
 * updated
 * @param self
 */
function paymentUpdated(self) {
    updateTableRows();
    updateTotalPayments();
}

function updateTotalPayments() {
    $('#totalPaid').val(getTotalPayments());
}

function clearTicker() {
    clearTimeout(myTimer);
    myTimer = null;
}

/**
 * calculate dividend amount
 * @param tax
 * @param payment
 * @returns {string}
 */
function getDividend(tax, payment) {
    var dividend = Math.max((payment-tax), 0);
    return precisionRound(dividend, 2).toFixed(2);
}

/**
 * add up total payments
 * @returns {number}
 */
function getTotalPayments() {
    var t=0;
    $('.payment-amount').each(function (e) {
        var v = parseFloat($(this).val());
        if (!isNaN(v)) {
            t += v;
        }
    });
    return t;
}

/**
 * format number
 * @param number
 * @param precision
 * @returns {number}
 */
function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

/**
 * function called by timer
 * @param self
 */
function paymentTimeout(self) {
    clearTicker();
    paymentUpdated(self);
}

function updateTableRows() {

    var rows = $('.payment-amount').length;
    var totalTax = parseFloat($('#totalTax').val());
    var i = precisionRound((totalTax / rows), 2);
    var lastOne = rows-1;
    var accumulate = 0;
    var totalPayments = getTotalPayments();
    if (isNaN(totalPayments)) {
        totalPayments = 0;
    }

    $('.payment-amount').each(function (index, ele) {

        var p = $(ele).parent().parent();
        var v = parseFloat($(ele).val());
        if (isNaN(v)) {
            v = 0;
        }

        var percent = (v / totalPayments);
        i = precisionRound((totalTax * percent), 2);
        if (isNaN(i)) {
            i = 0;
        }

        // console.log('i, before', i);

        if (lastOne == index) {
            i = (totalTax - accumulate).toFixed(2);
        }

        i = Math.min(i, v);

        // console.log('i, after', i);
        // console.log('v', v);
        // console.log('dividend', getDividend(i, v));

        $('.paye-amount', $(p)).val(i);
        $('.dividend-amount', p).val(getDividend(i, v));

        accumulate += i;
    });
}

$( document ).ready(function() {

    $('[data-toggle="tooltip"]').tooltip();

    $('#add_payment').click(function (e) {
        var $tr = $('tbody').children().last();
        var $cnt = parseInt($tr.find('.counter').html());
        $cnt++;
        var $clone = $tr.clone(true);
        $clone.find(':text').val(0);
        $clone.find('.counter').html($cnt);
        $clone.appendTo($('tbody'));
        updateTableRows();
        updateTotalPayments();
        $('#remove_payment').prop('disabled', false);
        $(this).tooltip('hide')
    });

    $('#remove_payment').click(function (e) {
        var rows = $('.payment-amount').length;
        var self = this;
        if (rows > 1) {
            $('table tr:last').remove();
            updateTableRows();
            updateTotalPayments();
            if (rows == 2 ) {
                $(self).prop('disabled', true);
            }
        }
        $(self).tooltip('hide');
    });

    $('#totalTax')
        .blur(function (e) {
            var self = this;
            paymentUpdated(self);
        })
        /*.bind('keyup mouseup', function () {
            var self = this;
            if(myTimer === null) {
                myTimer = setTimeout(paymentTimeout, 1000, self);
            }
        })*/;

    $('.payment-amount')
        .blur(function (e) {
            var self = this;
            paymentUpdated(self);

        }).change(function (e) {
            var self = this;
            if(myTimer === null) {
                myTimer = setTimeout(paymentTimeout, 1000, self);
            }
        });
});
