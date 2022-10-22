import React, { useEffect, useState } from 'react';
import { HiOutlineTrash, HiChevronDown } from 'react-icons/hi';
import { RiAddCircleLine, RiEdit2Fill } from 'react-icons/ri';
import { BsFillPersonPlusFill, BsSearch } from 'react-icons/bs';
import useStatus from 'renderer/hooks/useStatus';
import AdddataModal from './AdddataModal';
import EditdataModal from './EditdataModal';

export default function DataLists({
  datas,
  deleteGuest,
  setCurrentData,
  openDrawer,
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 50);
  }, [datas]);
  return (
    <>
      {datas &&
        show &&
        datas?.map((data, index) => {
          return (
            <>
              <div
                className="book-list-content fade-fly-in"
                onClick={(e) => {
                  openDrawer(e);
                }}
              >
                <HiChevronDown className="book-chevron-icon" size={20} />
                <div
                  className="flex-inline flex-justify-between"
                  style={{ width: '100%' }}
                >
                  <div className="flex-column flex-align-start">
                    <h4>{data?.name}</h4>
                    <span className="span-pill" style={{ marginTop: 7 }}>
                      {data?.title}
                    </span>
                  </div>
                  <div className="book-buttons">
                    <button
                      className="button-confirm-trans"
                      onClick={(e) => {
                        setCurrentData({
                          index: index,
                          id: data?.id,
                          name: data?.name,
                          title: data?.title,
                          desc: data?.desc,
                          insertedAt: data?.insertedAt,
                        });
                        e.stopPropagation();
                      }}
                    >
                      <RiEdit2Fill size="14" />
                      Edit Data
                    </button>
                    <button
                      className="button-danger-trans"
                      onClick={(e) => {
                        deleteGuest(index);
                        e.stopPropagation();
                      }}
                    >
                      <HiOutlineTrash size="14" />
                    </button>
                  </div>
                </div>
                <div
                  className="container flex-column gap-5"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="flex-inline flex-align-start flex-justify-between">
                    <div className="flex-column gap-15 fw">
                      <span className="span-text">{data?.desc}</span>
                      <div
                        className="flex-inline flex-justify-end gap-15 fw"
                        style={{ fontStyle: 'italic' }}
                      >
                        <span
                          className="span-text"
                          style={{ fontSize: '0.7rem' }}
                        >
                          Inserted : {data?.insertedAt ? data?.insertedAt : '-'}
                        </span>
                        <span
                          className="span-text"
                          style={{ fontSize: '0.7rem' }}
                        >
                          Updated : {data?.updatedAt ? data?.updatedAt : '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      {!datas ||
        (datas.length === 0 && (
          <>
            <div
              style={{
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <h4 className="fade-fly-in">No data has been written</h4>
              <span className="span-text fade-fly-in">Try add list a data</span>
            </div>
          </>
        ))}
    </>
  );
}
