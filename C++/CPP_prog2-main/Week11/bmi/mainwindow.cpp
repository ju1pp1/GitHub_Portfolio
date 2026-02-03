#include "mainwindow.hh"
#include "ui_mainwindow.h"
#include <QMessageBox>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);

    connect(ui->countButton, &QPushButton::clicked, this, &MainWindow::on_countButton_clicked);
    connect(ui->weightLineEdit, &QLineEdit::editingFinished, this, &MainWindow::on_weightLineEdit_editingFinished);
    connect(ui->heightLineEdit, &QLineEdit::editingFinished, this, &MainWindow::on_heightLineEdit_editingFinished);
}

MainWindow::~MainWindow()
{
    delete ui;
}


void MainWindow::on_weightLineEdit_editingFinished()
{
    //qDebug() << "Weight";
}

void MainWindow::on_heightLineEdit_editingFinished()
{
    //qDebug() << "Height";
}

void MainWindow::on_countButton_clicked()
{
    //qDebug() << "Count";
    //Get the text from the weight and height
    QString weightText = ui->weightLineEdit->text();
    QString heightText = ui->heightLineEdit->text();

    if(weightText.isEmpty() || heightText.isEmpty() || weightText.toFloat() == 0 || heightText.toFloat() == 0)
    {
        ui->resultLabel->setText(tr("Cannot count"));
        return;
    }
    //Convert text to numbers
    bool weightOk, heightOk;
    float weight = weightText.toFloat(&weightOk);
    float height = heightText.toFloat(&heightOk);

    //Check if conversion was successful
    if(!weightOk || !heightOk || weight <= 0 || height <= 0)
    {
        QMessageBox::warning(this, tr("Error"), tr("Please enter valid value"), QMessageBox::Ok);
        return;
    }
    float bmi = (weight / (height * height) * 10000);
    ui->resultLabel->setText(tr("%1").arg(bmi));

    if(bmi < 18.5)
    {
        ui->infoTextBrowser->setText(tr("Underweight"));
    }
    else if(bmi > 25.0)
    {
        ui->infoTextBrowser->setText(tr("Overweight"));
    }
    else {
        ui->infoTextBrowser->setText(tr("Normal range"));
    }
}
