#ifndef MAINWINDOW_HH
#define MAINWINDOW_HH

#include <QMainWindow>
#include <QTimer>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:

    void onConfirmButtonClicked();

    void onCloseButtonClicked();

    void onRollButtonClicked();

    void onTurnButtonClicked();

    void onResetButtonClicked();

    void updateGuideText();
    void onCheckBoxStateChanged(int state);
    void onSecTimer();

private:
    Ui::MainWindow *ui;
    //Implementing
    QTimer* timer;

};
#endif // MAINWINDOW_HH
